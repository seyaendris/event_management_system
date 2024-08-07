
import PackageForm from "@/components/shared/PackageForm";
import { auth } from "@clerk/nextjs/server";

const CreateProduct = () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  return (
    <>
      <section className="bg-orange-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Create Your Package</h3>
      </section>
      <div className="wrapper my-8 drop-shadow-md">
        <PackageForm userId={userId} type="Create" />
      </div>
    </>
  );
};

export default CreateProduct;
