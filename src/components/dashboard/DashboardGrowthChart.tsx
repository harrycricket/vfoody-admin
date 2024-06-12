'use client';
import React from 'react';
import Chart from 'react-apexcharts';
const DashboardGrowthChart = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col w-full">
      <h2 className="text-xl font-semibold mb-4">Growh Rate</h2>
      <div className="grid grid-cols-3 gap-2">
        <div className="text-center relative mx-[-24px]">
          <Chart
            options={{
              chart: {
                height: 350,
                type: 'radialBar',
              },
              plotOptions: {
                radialBar: {
                  hollow: {
                    size: '50%',
                  },
                  dataLabels: {
                    name: {
                      show: false,
                    },
                    value: {
                      show: false,
                    },
                  },
                },
              },
            }}
            series={[62]}
            type="radialBar"
            height={240}
          />
          <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center">
            <div className="text-blue-500 text-2xl font-bold">62%</div>
            <div className="text-gray-500 text-sm">Revenue Growth</div>
          </div>
        </div>
        <div className="text-center relative mx-[-24px]">
          <Chart
            options={{
              chart: {
                height: 350,
                type: 'radialBar',
              },
              plotOptions: {
                radialBar: {
                  hollow: {
                    size: '50%',
                  },
                  dataLabels: {
                    name: {
                      show: false,
                    },
                    value: {
                      show: false,
                    },
                  },
                },
              },
              colors: ['#EAB308'],
            }}
            series={[62]}
            type="radialBar"
            height={240}
          />
          <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center">
            <div className="text-yellow-500 text-2xl font-bold">81%</div>
            <div className="text-gray-500 text-sm">Total Order Growth</div>
          </div>
        </div>
        <div className="text-center relative mx-[-24px]">
          <Chart
            options={{
              chart: {
                height: 350,
                type: 'radialBar',
              },
              plotOptions: {
                radialBar: {
                  hollow: {
                    size: '50%',
                  },
                  dataLabels: {
                    name: {
                      show: false,
                    },
                    value: {
                      show: false,
                    },
                  },
                },
              },
              colors: ['#22C55E'],
            }}
            series={[62]}
            type="radialBar"
            height={240}
          />
          <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center">
            <div className="text-green-500 text-2xl font-bold">22%</div>
            <div className="text-gray-500 text-sm">User Growth</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardGrowthChart;
