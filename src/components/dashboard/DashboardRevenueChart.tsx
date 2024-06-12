import React from 'react';

const DashboardRevenueChart = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-semibold mb-4">Total Revenue</h2>
      <div>
        <canvas id="totalRevenue" className="h-40"></canvas>
      </div>
    </div>
  );
};

export default DashboardRevenueChart;
