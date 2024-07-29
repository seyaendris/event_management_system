// import { IProduct } from '@/types';
import { IProduct } from '@/lib/database/models/product.model';
import React from 'react';

type ProductCardProps = {
  product: IProduct;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="group relative flex min-h-[200px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-transform duration-300 hover:scale-105 md:min-h-[250px]">
      <div className="flex min-h-[200px] flex-col gap-3 p-5 md:gap-4">
        <div className="flex gap-2">
          <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-600">
            ${product.price}
          </span>
          <p className="p-semibold-14 w-min rounded-full bg-gray-200 px-4 py-1 text-gray-600 line-clamp-1">
            {product.productCategory.name}
          </p>
        </div>

        <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">{product.name}</p>

        <p className="p-regular-14 text-gray-600">{product.description}</p>

        <div className="flex-between w-full">
          <p className="p-medium-14 md:p-medium-16 text-gray-600">
            {product.contactInfo}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
