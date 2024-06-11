import React, { ReactNode } from 'react';
import SideBar from '../common/SideBar';
import { Barlow } from 'next/font/google';
const barlow = Barlow({
  subsets: ['latin-ext', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800'],
});

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-[auto,3fr] grid-rows-[auto,1fr] h-screen w-screen overflow-hidden ${barlow.className}`}
    >
      <div className="col-span-1 row-span-2">
        <SideBar activeContentIndex={0} />
      </div>

      {/* Header */}
      <div className="md:col-span-1 bg-blue-500 p-4">
        <h1 className="text-white text-2xl">Header</h1>
      </div>

      {/* Main Content */}
      <div className="md:col-span-1 bg-white p-4 overflow-y-auto overflow-x-hidden">
        <h2 className="text-xl">Main Content</h2>
        <p>Main content goes here</p>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
