// import { IProduct } from '@/types';
import React from 'react';
import Pagination from './Pagination';
import ProductCard from './ProductCard';
import { IProduct } from '@/lib/database/models/product.model';

type ProductCollectionProps = {
  data: IProduct[],
  emptyTitle: string,
  emptyStateSubtext: string,
  limit: number,
  page: number | string,
  totalPages?: number,
  urlParamName?: string,
  collectionType?: 'All_Products',
  columns?: number,
};

const ProductCollection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
  columns = 3,
}: ProductCollectionProps) => {
  const getColumnClasses = (columns: number) => {
    switch (columns) {
      case 2:
        return 'sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2';
      case 3:
        return 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3';
      default:
        return 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3';
    }
  };

  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className={`grid w-full grid-cols-1 gap-5 ${getColumnClasses(columns)}`}>
            {data.map((product) => (
              <li key={product._id} className="flex justify-center">
                <ProductCard product={product} />
              </li>
            ))}
          </ul>

          {/* {totalPages > 1 && (
            <Pagination urlParamName={urlParamName} page={page} totalPages={totalPages} />
          )} */}
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
          <p className="p-regular-14">{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default ProductCollection;
