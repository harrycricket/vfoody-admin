'use client';
import React from 'react';
import Chart, { Props } from 'react-apexcharts';

const state: Props['series'] = [
  {
    name: '2023',
    data: [11, 32, 45, 32, 34, 52, 41, 31, 40, 28, 51, 42],
  },
  {
    name: '2024',
    data: [31, 40, 28, 51, 42, 80, 100, 90, 85, 80, 90, 87],
  },
];

const options: Props['options'] = {
  chart: {
    type: 'area',
    animations: {
      easing: 'linear',
      speed: 300,
    },
    sparkline: {
      enabled: false,
    },
    brush: {
      enabled: false,
    },
    id: 'basic-bar',
    fontFamily: 'Inter, sans-serif',
    foreColor: 'var(--nextui-colors-accents9)',
    stacked: false,
    toolbar: {
      show: true,
    },
  },

  xaxis: {
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    labels: {
      // show: false,
      style: {
        colors: 'var(--nextui-colors-accents8)',
        fontFamily: 'Inter, sans-serif',
      },
    },
    axisBorder: {
      color: 'var(--nextui-colors-border)',
    },
    axisTicks: {
      color: 'var(--nextui-colors-border)',
    },
  },
  yaxis: {
    title: {
      text: 'Revenue (kVND)',
      rotate: -90,
      offsetX: 0,
      offsetY: 0,
      style: {
        color: '#ccc',
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif',
        fontWeight: 600,
      },
    },
    labels: {
      style: {
        colors: 'var(--nextui-colors-accents8)',
        fontFamily: 'Inter, sans-serif',
      },
    },
  },
  tooltip: {
    enabled: false,
  },
  grid: {
    show: true,
    borderColor: 'var(--nextui-colors-border)',
    strokeDashArray: 0,
    position: 'back',
  },
  stroke: {
    curve: 'smooth',
    fill: {
      colors: ['red'],
    },
  },
  colors: ['#33FF57', '#008FFB'],
  // @ts-ignore
  markers: false,
};

const DashboardRevenueChart = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-semibold mb-4">Total Revenue</h2>
      <div id="chart">
        <Chart options={options} series={state} type="area" height={240} />
      </div>
    </div>
  );
};

export default DashboardRevenueChart;
