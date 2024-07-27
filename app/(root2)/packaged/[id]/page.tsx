
import { getPackageById, getRelatedPackagesByCategory } from '@/lib/actions/package.actions';
import { SearchParamProps } from '@/types'
import Image from 'next/image';
import Link from 'next/link';

const PackageDetails = async ({ params: { id }, searchParams }: SearchParamProps) => {
  const packages = await getPackageById(id);

  const relatedPackages = await getRelatedPackagesByCategory({
    packageCategoryId: packages.packageCategory._id,
    packageId: packages._id,
    page: searchParams.page as string,
  })

  return (
    <>
    <section className="wrapper mt-16 rounded-3xl border-[1px] shadow-sm flex justify-center bg-neutral-100 bg-dotted-pattern bg-contain">
      <div className="grid grid-cols-1 md:flex md:flex-col 2xl:max-w-7xl md:wrapper">
        

        <div className="flex grow w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
            <h2 className='h2-bold'>{packages.name}</h2>
            <p className="p-medium-18 mt-2 sm:mt-0">
                By{' '}
                <span className="text-orange-900 font-bold">{packages.vendor.firstName} {packages.vendor.lastName}</span>
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex gap-3 flex-col md:flex-row">
                
                  <p className="p-bold-20 rounded-lg bg-gray-500/10 px-5 py-2 text-gray-700">
                    Price:  ${packages.price}
                  </p>
              
                <p className="p-medium-16 rounded-lg bg-orange-500/10 px-4 py-2.5 text-gray-500">
                  {packages.packageCategory.name}
                </p>

              </div>
        </div>

          </div>

          {/* <CheckoutButton event={event} /> */}

        <div className="flex flex-col gap-5">
        

        <div className="p-regular-20 flex items-center gap-3">
            {/* <Image src="/assets/icons/location.svg" alt="location" width={32} height={32} /> */}
            <p className="p-medium-16 lg:p-regular-20">{packages.includedServices}</p>
        </div>
        </div>

          <div className="flex flex-col gap-2">
          
            <p className="p-medium-16 lg:p-regular-18">{packages.description}</p>
           
          </div>
        </div>
      </div>
    </section>

    {/* PRODUCTS with the same category */}
    {/* <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
      <h2 className="h2-bold">Related Products</h2>

      <Collection 
          data={relatedEvents?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={3}
          page={searchParams.page as string}
          totalPages={relatedEvents?.totalPages}
        />
    </section> */}
    </>
  )
}

export default PackageDetails