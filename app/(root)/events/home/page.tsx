import React from 'react';
import DashCards from '../../../../components/shared/DashCards';
import RevenueChart from '../../../../components/shared/RevenueChart';
import LatestEvents from '../../../../components/shared/LatestEvents';
import { SearchParamProps } from '../../../../types';

const Home = ({ params, searchParams }: SearchParamProps) => {
  return (
    <main>
      <h1 className='mb-4 text-xl md:text-3xl font-bold text-orange-600'>DashBoard</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <DashCards />
      </div>

      <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2'>
        <div className="md:col-span-1 lg:col-span-1">
          <RevenueChart />
        </div>
        <div className="md:col-span-1 lg:col-span-1">
          <LatestEvents params={params} searchParams={searchParams} />
        </div>
      </div>
    </main>
  );
}

export default Home;
