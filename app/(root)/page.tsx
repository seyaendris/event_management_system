import CategoryFilter from '@/components/shared/CategoryFilter';
import Collection from '@/components/shared/Collection';
import Search from '@/components/shared/Search';
import { Button } from '@/components/ui/button';
import { getAllEvents } from '@/lib/actions/event.actions';
import { SearchParamProps } from '@/types';
import Link from 'next/link';

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6
  });

  return (
    <div className='bg-neutral-50 h-full'>
      <section className="relative bg-gradient-to-b from-orange-100 bg-contain py-5 md:py-10 h-svh">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/hero3.jpg')" }}>
          <div className="absolute inset-0 bg-black opacity-60"></div> {/* Dark overlay */}
        </div>
        <div className="relative wrapper grid grid-cols-1 gap-5 md:grid-cols-1 2xl:gap-0 text-white text-center"> {/* Adjust text color to white */}
          <div className="flex flex-col justify-center gap-8 z-10 pt-5">
            <h1 className="h1-bold text-orange-400 bg-clip-text text-transparent animate-pulse bg-gradient-to-r from-orange-600 to bg-orange-50">Host, Connect and Celebrate Your Event with Nuevents!</h1> {/* Adjust text color to white */}
            <p className="p-regular-20 md:p-regular-24 text-gray-200  md:w-1/2 text-left pt-16">You can HOST your Event and connect with Customers, BOOK your favorite Event easily right here.</p> {/* Adjust text color to a lighter gray */}
            <Button size="lg" asChild className="button w-full sm:w-fit bg-orange-600 hover:bg-orange-500">
              <Link href="#events">
                Explore Now
              </Link>
            </Button>
          </div>
        </div>
      </section> 

      <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold pt-3 mt-2">Trusted by Thousands of Events</h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>

        <Collection 
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
          columns={3} // Default columns for Home page
        />
      </section>
    </div>
  );
}
