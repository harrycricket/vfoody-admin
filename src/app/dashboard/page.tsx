import AdminLayout from '@/components/layouts/AdminLayout';
import React from 'react';

const Dashboard = () => {
  return (
    <AdminLayout activeContentIndex={0}>
      <div className="pl-4 pr-4">
        <h2 className="text-xl">Dashboard</h2>
        <p>Hi Duy Đức. Welcome back to VFoody Admin.</p>
        <div className="flex justify-center items-center">Welcome to Dashboard</div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
