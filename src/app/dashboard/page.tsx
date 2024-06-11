import AdminLayout from '@/components/layouts/AdminLayout';
import React from 'react';

const Dashboard = () => {
  return (
    <AdminLayout activeContentIndex={0}>
      <div className="pl-4 pr-4">
        <h2 className="text-xl">Dashboard</h2>
        <p>Hi Duy Đức. Welcome back to VFoody Admin.</p>
        <div className="flex justify-center items-center">Welcome to Dashboard</div>
        {/* Dashboard Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
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
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
