
import ProductForm from "@/components/shared/ProductForm";
import { getProductById } from "@/lib/actions/product.actions";
import { auth } from "@clerk/nextjs/server";

type UpdateProductProps = {
  params: {
    id: string
  }
}

const UpdateProduct = async ({ params: { id } }: UpdateProductProps) => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  const product = await getProductById(id)

  return (
    <>
      <section className="bg-orange-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Update Product</h3>
      </section>

      <div className="wrapper my-8 drop-shadow-lg">
        <ProductForm 
          type="Update" 
          product={product} 
          productId={product._id} 
          userId={userId} 
        />
      </div>
    </>
  )
}

export default UpdateProduct
