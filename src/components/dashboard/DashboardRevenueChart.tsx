'use client';
import REACT_QUERY_CACHE_KEYS from '@/data/constants/react-query-cache-keys';
import useFetchWithRQWithFetchFunc from '@/hooks/fetching/useFetchWithRQWithFetchFunc';
import usePeriodTimeFilterState from '@/hooks/states/usePeriodTimeFilterQuery';
import apiClient from '@/services/api-services/api-client';
import { DashboardRevenueAPIReponse } from '@/types/responses/DashboardResponse';
import React from 'react';
import Chart, { Props } from 'react-apexcharts';

const dashboardRevenueEndpoint =
  'https://my-json-server.typicode.com/duckodei/vfoody-admin-sample-api/revenue/';

const DashboardRevenueChart = () => {
  const { range } = usePeriodTimeFilterState();
  const { data, isLoading, error } = useFetchWithRQWithFetchFunc(
    REACT_QUERY_CACHE_KEYS.DASHBOARD_REVENUE,
    (): Promise<DashboardRevenueAPIReponse> =>
      apiClient
        .get<DashboardRevenueAPIReponse>(dashboardRevenueEndpoint, {
          params: { ...range },
        })
        .then((response) => response.data),
    [range],
  );

  const lastYear = data?.value?.lastYear ? data.value.lastYear.toString() : 'Last year';
  const thisYear = data?.value?.thisYear ? data.value.thisYear.toString() : 'This year';
  const state: Props['series'] = [
    {
      name: lastYear,
      data: data?.value?.twelveMonthRevenue
        ? data?.value?.twelveMonthRevenue.map((item) => item.lastYear / 1_000_000)
        : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: thisYear,
      data: data?.value?.twelveMonthRevenue
        ? data?.value?.twelveMonthRevenue.map((item) => item.thisYear / 1_000_000)
        : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
        text: 'Millions VND',
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
