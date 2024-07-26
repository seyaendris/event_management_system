import Collection from '../../../../components/shared/Collection';
import { Button } from '../../../../components/ui/button';
import { getEventsByUser } from '../../../../lib/actions/event.actions';
import { getOrdersByUser } from '../../../../lib/actions/order.actions';
import { IOrder } from '../../../../lib/database/models/order.model';
import { auth } from '@clerk/nextjs/server';
import React from 'react';
import { SearchParamProps } from '../../../../types';

const Organized = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;

  const orders = await getOrdersByUser({ userId, page: ordersPage });

  const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];
  const organizedEvents = await getEventsByUser({ userId, page: eventsPage });

  return (
    <>
      {/* Events Organized */}
      <section className="bg-neutral-100 rounded-2xl bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper rounded-2xl flex items-center justify-center sm:justify-between">
          <h3 className='h3-bold text-center sm:text-left text-orange-600'>Events Organized</h3>
          {/* <Button asChild size="lg" className="button hidden sm:flex bg-orange-600 hover:bg-orange-500">
            <Link href="/events/create">
              Create New Event
            </Link>
          </Button> */}
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection 
          data={organizedEvents?.data}
          emptyTitle="No events have been created yet"
          emptyStateSubtext="Go create some now"
          collectionType="Events_Organized"
          limit={3}
          page={eventsPage}
          urlParamName="eventsPage"
          totalPages={organizedEvents?.totalPages}
          columns={2} // Pass 2 columns here
        />
      </section>
    </>
  );
}

export default Organized;
