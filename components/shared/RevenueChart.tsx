// import { generateYAxis } from '@/app/lib/utils';
import { FaCalendar } from 'react-icons/fa';
// import { Revenue } from '@/app/lib/definitions';
import React from 'react';


export type Revenue = {
    month: string;
    revenue: number;
  };
  
  export const generateYAxis = (revenue: Revenue[]) => {
    // Calculate what labels we need to display on the y-axis
    // based on highest record and in 1000s
    const yAxisLabels: string[] = [];
    const highestRecord = Math.max(...revenue.map((month) => month.revenue));
    const topLabel = Math.ceil(highestRecord / 1000) * 1000;
  
    for (let i = topLabel; i >= 0; i -= 1000) {
      yAxisLabels.push(`${i / 1000}K`);
    }
  
    return { yAxisLabels, topLabel };
  };
  

// Sample manual data for revenue
const manualRevenueData: Revenue[] = [
  { month: 'Jan', revenue: 5000 },
  { month: 'Feb', revenue: 7000 },
  { month: 'Mar', revenue: 8000 },
  { month: 'Apr', revenue: 6000 },
  { month: 'May', revenue: 9000 },
  { month: 'Jun', revenue: 10000 },
  { month: 'Jul', revenue: 7500 },
  { month: 'Aug', revenue: 8500 },
  { month: 'Sep', revenue: 9500 },
  { month: 'Oct', revenue: 11000 },
  { month: 'Nov', revenue: 12000 },
//   { month: 'December', revenue: 13000 },
];

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default function RevenueChart() {
  const revenue = manualRevenueData; // Use manual data instead of fetching

  const chartHeight = 350;

  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <div className="w-full md:col-span-5">
      <h2 className={` mb-4 text-xl md:text-2xl text-orange-800`}>
        Recent Revenue
      </h2>

      <div className="rounded-xl bg-neutral-100 p-4">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {revenue.map((month) => (
            <div key={month.month} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-orange-500"
                style={{
                  height: `${(chartHeight / topLabel) * month.revenue}px`,
                }}
              ></div>
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                {month.month}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <FaCalendar className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}
