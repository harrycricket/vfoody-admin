import React from 'react';
import { FaArrowUpLong, FaMoneyBillWheat, FaUser } from 'react-icons/fa6';
import { FcMoneyTransfer } from 'react-icons/fc';
import { GiBuyCard } from 'react-icons/gi';

const DashboardOverview = () => {
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
        <div className="bg-green-100 p-4 rounded-full mr-4">
          <FaMoneyBillWheat size={24} color="green" />
        </div>
        <div>
          <p className="text-gray-500">Total Trading</p>
          <p className="text-3xl font-bold">292M</p>
          <div className="flex items-center mt-[4px]">
            <div className="bg-green-100 flex justify-center items-center w-[16px] h-[16px] rounded-full">
              <FaArrowUpLong color="green" size={8} />
            </div>
            <span className="text-green-500 text-sm ml-2">12% (30 days)</span>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
        <div className="bg-green-100 p-4 rounded-full mr-4">
          <FcMoneyTransfer size={24} />
        </div>
        <div>
          <p className="text-gray-500">Total Revenue</p>
          <p className="text-3xl font-bold">43M</p>
          <div className="flex items-center mt-[4px]">
            <div className="bg-green-100 flex justify-center items-center w-[16px] h-[16px] rounded-full">
              <FaArrowUpLong color="green" size={8} />
            </div>
            <span className="text-green-500 text-sm ml-2">12% (30 days)</span>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
        <div className="bg-green-100 p-4 rounded-full mr-4">
          <GiBuyCard color="green" size={25} />
        </div>
        <div>
          <p className="text-gray-500">Total Orders</p>
          <p className="text-3xl font-bold">1.052</p>
          <div className="flex items-center mt-[4px]">
            <div className="bg-green-100 flex justify-center items-center w-[16px] h-[16px] rounded-full">
              <FaArrowUpLong color="green" size={8} />
            </div>
            <span className="text-green-500 text-sm ml-2">12% (30 days)</span>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
        <div className="bg-green-100 p-4 rounded-full mr-4">
          <FaUser size={24} color="green" />
        </div>
        <div>
          <p className="text-gray-500">Total Users</p>
          <p className="text-3xl font-bold">2.152</p>
          <div className="flex items-center mt-[4px]">
            <div className="bg-green-100 flex justify-center items-center w-[16px] h-[16px] rounded-full">
              <FaArrowUpLong color="green" size={8} />
            </div>
            <span className="text-green-500 text-sm ml-2">12% (30 days)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
