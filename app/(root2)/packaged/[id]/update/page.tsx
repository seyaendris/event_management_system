
import PackageForm from "@/components/shared/PackageForm";
import { getPackageById } from "@/lib/actions/package.actions";
import { auth } from "@clerk/nextjs/server";

type UpdatePackageProps = {
  params: {
    id: string
  }
}

const UpdatePackage = async ({ params: { id } }: UpdatePackageProps) => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  const packages = await getPackageById(id)

  return (
    <>
      <section className="bg-orange-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Update Package</h3>
      </section>

      <div className="wrapper my-8 drop-shadow-lg">
        <PackageForm 
          type="Update" 
          packages={packages} 
          packageId={packages._id} 
          userId={userId} 
        />
      </div>
    </>
  )
}

export default UpdatePackage
