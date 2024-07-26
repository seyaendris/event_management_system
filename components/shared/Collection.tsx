import { IEvent } from '@/lib/database/models/event.model';
import React from 'react';
import Pagination from './Pagination';
import Card from './Card';

type CollectionProps = {
  data: IEvent[],
  emptyTitle: string,
  emptyStateSubtext: string,
  limit: number,
  page: number | string,
  totalPages?: number,
  urlParamName?: string,
  collectionType?: 'Events_Organized' | 'My_Tickets' | 'All_Events',
  columns?: number, // Add this prop
};

const Collection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
  columns = 3, // Default to 3 columns
}: CollectionProps) => {
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
            {data.map((event) => {
              const hasOrderLink = collectionType === 'Events_Organized';
              const hidePrice = collectionType === 'My_Tickets';

              return (
                <li key={event._id} className="flex justify-center">
                  <Card event={event} hasOrderLink={hasOrderLink} hidePrice={hidePrice} />
                </li>
              );
            })}
          </ul>

          {totalPages > 1 && (
            <Pagination urlParamName={urlParamName} page={page} totalPages={totalPages} />
          )}
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

export default Collection;
