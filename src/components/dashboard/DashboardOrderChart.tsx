import React from 'react';

const DashboardOrderChart = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Chart Order</h2>
        <button className="text-blue-500">
          <i className="fas fa-download"></i> Save Report
        </button>
      </div>
      <div>
        <canvas id="chartOrder" className="h-40"></canvas>
      </div>
    </div>
  );
};

export default DashboardOrderChart;
