import React from 'react';

const DashboardGrowthChart = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col w-full">
      <h2 className="text-xl font-semibold mb-4">Growh Rate</h2>
      <div className="flex justify-around flex-1 items-center">
        <div className="text-center">
          <div className="text-blue-500 text-3xl font-bold">62%</div>
          <div className="text-gray-500">Revenue Growth</div>
        </div>
        <div className="text-center">
          <div className="text-yellow-500 text-3xl font-bold">81%</div>
          <div className="text-gray-500">Total Order Growth</div>
        </div>
        <div className="text-center">
          <div className="text-green-500 text-3xl font-bold">22%</div>
          <div className="text-gray-500">User Growth</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardGrowthChart;
