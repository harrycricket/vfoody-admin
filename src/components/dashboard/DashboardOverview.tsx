import React from 'react';

const DashboardOverview = () => {
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
        <div className="bg-green-100 p-4 rounded-full mr-4">
          <i className="fas fa-wallet text-green-500 text-2xl"></i>
        </div>
        <div>
          <p className="text-2xl font-bold">292M</p>
          <p className="text-gray-500">Total Revenue</p>
          <p className="text-green-500 text-sm">12% (30 days)</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
        <div className="bg-green-100 p-4 rounded-full mr-4">
          <i className="fas fa-shopping-cart text-green-500 text-2xl"></i>
        </div>
        <div>
          <p className="text-2xl font-bold">1.052</p>
          <p className="text-gray-500">Total Orders</p>
          <p className="text-green-500 text-sm">12% (30 days)</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
        <div className="bg-green-100 p-4 rounded-full mr-4">
          <i className="fas fa-users text-green-500 text-2xl"></i>
        </div>
        <div>
          <p className="text-2xl font-bold">2.152</p>
          <p className="text-gray-500">Total Users</p>
          <p className="text-green-500 text-sm">12% (30 days)</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
        <div className="bg-green-100 p-4 rounded-full mr-4">
          <i className="fas fa-chart-line text-green-500 text-2xl"></i>
        </div>
        <div>
          <p className="text-2xl font-bold">43M</p>
          <p className="text-gray-500">Total Profit</p>
          <p className="text-green-500 text-sm">20% (30 days)</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
