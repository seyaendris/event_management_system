import ProductCategoryFilter from '@/components/shared/ProductCategoryFilter';
import ProductCollection from '@/components/shared/ProductCollection';
import Search from '@/components/shared/Search';
import { Button } from '@/components/ui/button';
import { getAllProducts } from '@/lib/actions/product.actions';
import { SearchParamProps } from '@/types';
import Link from 'next/link';

export default async function Products({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const productCategory = (searchParams?.productCategory as string) || '';

  const products = await getAllProducts({
    query: searchText,
    productCategory,
    page,
    limit: 6
  });

  return (
    <>
      <section className="relative bg-gradient-to-b from-green-100 bg-contain py-5 md:py-10 h-96">
        <div className="wrapper mt-5 absolute inset-0 bg-cover bg-center h-auto rounded-3xl" style={{ backgroundImage: "url('/assets/images/producthero.jpg')" }}>
          <div className="absolute inset-0 bg-black opacity-30 rounded-3xl"></div>
        </div>
        <div className="relative wrapper grid grid-cols-1 gap-5 md:grid-cols-1 text-center 2xl:gap-0 text-white">
          <div className="flex flex-col justify-center gap-8 z-10">
            <h1 className="h1-bold text-green-400 bg-clip-text text-transparent animate-pulse bg-gradient-to-r from-green-600 to bg-green-50">Discover Amazing Products!</h1>
            
            {/* <Button size="lg" asChild className="button w-full sm:w-fit bg-green-600 hover:bg-green-500">
              <Link href="#products">
                Explore Now
              </Link>
            </Button> */}
          </div>
        </div>
      </section>

      <section id="products" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Find the best products and deals right here</h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <ProductCategoryFilter />
        </div>

        <ProductCollection 
          data={products?.data}
          emptyTitle="No Products Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Products"
          limit={6}
          page={page}
          totalPages={products?.totalPages}
          columns={3}
        />
      </section>
    </>
  );
}
