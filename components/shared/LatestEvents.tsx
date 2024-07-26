import React from 'react'
import { SearchParamProps } from '../../types'
import { getEventsByUser } from '../../lib/actions/event.actions'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import { FaSyncAlt } from 'react-icons/fa';

const LatestEvents = async ({ searchParams }: SearchParamProps) => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;
    const eventsPage = Number(searchParams?.eventsPage) || 1;

    const organizedEvents = await getEventsByUser({ userId, page: eventsPage })

    // Check if organizedEvents is defined and has data
    const eventsData = organizedEvents?.data || [];

    return (
        <div className="flex w-full flex-col md:col-span-4">
          <h2 className={`mb-4 text-xl md:text-2xl text-orange-800`}>
            Latest Events
          </h2>
          <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
            <div className="bg-white px-6">
              {eventsData.length > 0 ? (
                eventsData.map((event, i) => (
                  <div
                    key={event.id}
                    className={`flex flex-row items-center justify-between py-4 ${i !== 0 ? 'border-t' : ''}`}
                  >
                    <div className="flex items-center">
                      <Image
                        src={event.imageUrl}
                        alt={`${event.name}'s image`}
                        className="mr-4"
                        width={62}
                        height={32}
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold md:text-base">
                          {event.category.name}
                        </p>
                        {/* <p className="hidden text-sm text-gray-500 sm:block">
                          {event.date}
                        </p> */}
                      </div>
                    </div>
                    <p className={`truncate text-sm font-medium md:text-base`}>
                      {event.price}
                    </p>
                  </div>
                ))
              ) : (
                <p className="mt-4 text-gray-400">No events found.</p>
              )}
            </div>
            <div className="flex items-center pb-2 pt-6">
              <FaSyncAlt className="h-5 w-5 text-gray-500" />
              <h3 className="ml-2 text-sm text-gray-500">Updated just now</h3>
            </div>
          </div>
        </div>
    );
}

export default LatestEvents;
