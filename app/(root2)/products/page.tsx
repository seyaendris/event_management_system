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
      <section className="relative bg-gradient-to-b from-green-100 bg-contain py-5 md:py-10">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/hero3.jpg')" }}>
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>
        <div className="relative wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0 text-white">
          <div className="flex flex-col justify-center gap-8 z-10">
            <h1 className="h1-bold text-green-400">Discover Amazing Products!</h1>
            <p className="p-regular-20 md:p-regular-24 text-gray-200">Find the best products and deals right here.</p>
            <Button size="lg" asChild className="button w-full sm:w-fit bg-green-600 hover:bg-green-500">
              <Link href="#products">
                Explore Now
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="products" className="wrapper my-8 flex flex-col gap-8 md:gap-12 bg-neutral-50">
        <h2 className="h2-bold">Trusted by Thousands of Customers</h2>

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
