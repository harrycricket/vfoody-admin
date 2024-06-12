'use client';
import React from 'react';
import Chart, { Props } from 'react-apexcharts';

const state: Props['series'] = [
  {
    name: 'Total',
    data: [32, 45, 32, 34, 52, 41, 31],
  },
  {
    name: 'Successful',
    data: [12, 14, 15, 20, 14, 20, 12],
  },
  {
    name: 'Processing',
    data: [0, 0, 0, 0, 0, 0, 11],
  },
  {
    name: 'Failed',
    data: [1, 2, 1, 1, 2, 1, 1],
  },
  {
    name: 'Cancelled',
    data: [1, 1, 2, 1, 0, 0, 1],
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
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
      text: '',
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
  colors: ['#008FFB', '#33FF57', '#FDD35E', '#FF6969', '#686D76'],
  // @ts-ignore
  markers: false,
};

const DashboardOrderChart = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Chart Order</h2>
        <button className="text-blue-500">
          <i className="fas fa-download"></i> Save Report
        </button>
      </div>
      <div id="chartOrder">
        <Chart options={options} series={state} type="area" height={240} />
      </div>
    </div>
  );
};

export default DashboardOrderChart;
