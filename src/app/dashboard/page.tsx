'use client';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import AdminLayout from '@/components/layouts/AdminLayout';
import React from 'react';

const DashboardOrderChart = dynamic(
  () => import('../../components/dashboard/DashboardOrderChart'),
  {
    ssr: false,
  },
);
const DashboardRevenueChart = dynamic(
  () => import('../../components/dashboard/DashboardRevenueChart'),
  {
    ssr: false,
  },
);
const DashboardGrowthChart = dynamic(
  () => import('../../components/dashboard/DashboardGrowthChart'),
  {
    ssr: false,
  },
);

const Dashboard: NextPage = () => {
  return (
    <AdminLayout activeContentIndex={0}>
      <div className="pl-4 pr-4">
        <h2 className="text-xl">Dashboard</h2>
        <p>Hi Duy Đức. Welcome back to VFoody Admin.</p>
        <div className="grid grid-cols-2 gap-8 mt-3">
          <div className="h-full flex flex-grow justify-stretch items-stretch">
            <DashboardOverview />
          </div>
          <div className="h-full flex flex-grow justify-stretch items-stretch">
            <DashboardOrderChart />
          </div>
          <div className="h-full flex flex-grow justify-stretch items-stretch">
            <DashboardRevenueChart />
          </div>
          <div className="h-full flex flex-grow justify-stretch items-stretch">
            <DashboardGrowthChart />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
