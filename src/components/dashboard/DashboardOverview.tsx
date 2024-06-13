import REACT_QUERY_CACHE_KEYS from '@/data/constants/react-query-cache-keys';
import useFetchWithRQWithFetchFunc from '@/hooks/fetching/useFetchWithRQWithFetchFunc';
import usePeriodTimeFilterState from '@/hooks/states/usePeriodTimeFilterQuery';
import apiClient from '@/services/api-services/api-client';
import APICommonResponse from '@/types/responses/APICommonResponse';
import { DashboardOverviewAPIReponse } from '@/types/responses/DashboardResponse';
import { Skeleton } from '@nextui-org/react';
import React from 'react';
import { FaArrowUpLong, FaMoneyBillWheat, FaUser } from 'react-icons/fa6';
import { FcMoneyTransfer } from 'react-icons/fc';
import { GiBuyCard } from 'react-icons/gi';
import numberFormatUtilServicevice from '@/services/util-services/NumberFormatUtilService';

const dashboardOverviewEndpoint =
  'https://my-json-server.typicode.com/duckodei/vfoody-admin-sample-api/overview/';

const DashboardOverview = () => {
  const { range } = usePeriodTimeFilterState();
  const { data, isLoading, error } = useFetchWithRQWithFetchFunc(
    REACT_QUERY_CACHE_KEYS.DASHBOARD_OVERVIEW,
    (): Promise<DashboardOverviewAPIReponse> =>
      apiClient
        .get<DashboardOverviewAPIReponse>(dashboardOverviewEndpoint, {
          params: { ...range },
        })
        .then((response) => response.data),
    [range],
  );

  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
        <div className="bg-green-100 p-4 rounded-full mr-4">
          <FaMoneyBillWheat size={24} color="green" />
        </div>
        <div>
          <p className="text-gray-500">Total Trading</p>
          <p className="text-3xl font-bold">
            {isLoading && data ? (
              <Skeleton className="flex rounded-full w-20 h-8" />
            ) : data?.value.totalTrading ? (
              numberFormatUtilServicevice.formatMillionNumberWithDotEach3digits(
                data.value.totalTrading,
              ) + 'M'
            ) : (
              '---'
            )}
          </p>
          <div className="flex items-center mt-[4px]">
            <div className="bg-green-100 flex justify-center items-center w-[16px] h-[16px] rounded-full">
              <FaArrowUpLong
                color={`${data && data?.value.totalTradingRate < 0 ? 'red' : 'green'}`}
                size={8}
              />
            </div>
            <span
              className={`text-${data && data?.value.totalTradingRate < 0 ? 'red' : 'green'}-500 text-sm ml-2 `}
            >
              {isLoading && data ? (
                <Skeleton className="flex rounded-full w-20 h-8" />
              ) : (
                `${Math.abs(data?.value.totalTradingRate || 0)}% (${data?.value.dayCompareRate} days)`
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
        <div className="bg-green-100 p-4 rounded-full mr-4">
          <FcMoneyTransfer size={24} />
        </div>
        <div>
          <p className="text-gray-500">Total Revenue</p>
          <p className="text-3xl font-bold">
            {isLoading && data ? (
              <Skeleton className="flex rounded-full w-20 h-8" />
            ) : data?.value.totalRevenue ? (
              numberFormatUtilServicevice.formatMillionNumberWithDotEach3digits(
                data.value.totalRevenue,
              ) + 'M'
            ) : (
              '---'
            )}
          </p>
          <div className="flex items-center mt-[4px]">
            <div className="bg-green-100 flex justify-center items-center w-[16px] h-[16px] rounded-full">
              <FaArrowUpLong
                color={`${data && data?.value.totalRevenueRate < 0 ? 'red' : 'green'}`}
                size={8}
              />
            </div>
            <span
              className={`text-${data && data?.value.totalRevenueRate < 0 ? 'red' : 'green'}-500 text-sm ml-2 `}
            >
              {isLoading && data ? (
                <Skeleton className="flex rounded-full w-20 h-8" />
              ) : (
                `${Math.abs(data?.value.totalRevenueRate || 0)}% (${data?.value.dayCompareRate} days)`
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
        <div className="bg-green-100 p-4 rounded-full mr-4">
          <GiBuyCard color="green" size={25} />
        </div>
        <div>
          <p className="text-gray-500">Total Orders</p>
          <p className="text-3xl font-bold">
            {isLoading && data ? (
              <Skeleton className="flex rounded-full w-20 h-8" />
            ) : data?.value.totalOrder ? (
              numberFormatUtilServicevice.formatNumberWithDotEach3digits(data.value.totalOrder)
            ) : (
              '---'
            )}
          </p>
          <div className="flex items-center mt-[4px]">
            <div className="bg-green-100 flex justify-center items-center w-[16px] h-[16px] rounded-full">
              <FaArrowUpLong
                color={`${data && data?.value.totalOrderRate < 0 ? 'red' : 'green'}`}
                size={8}
              />
            </div>
            <span
              className={`text-${data && data?.value.totalOrderRate < 0 ? 'red' : 'green'}-500 text-sm ml-2 `}
            >
              {isLoading && data ? (
                <Skeleton className="flex rounded-full w-20 h-8" />
              ) : (
                `${Math.abs(data?.value.totalOrderRate || 0)}% (${data?.value.dayCompareRate} days)`
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
        <div className="bg-green-100 p-4 rounded-full mr-4">
          <FaUser size={24} color="green" />
        </div>
        <div>
          <p className="text-gray-500">Total Users</p>
          <p className="text-3xl font-bold">
            {' '}
            {isLoading && data ? (
              <Skeleton className="flex rounded-full w-20 h-8" />
            ) : data?.value.totalUser ? (
              numberFormatUtilServicevice.formatNumberWithDotEach3digits(data.value.totalUser)
            ) : (
              '---'
            )}
          </p>
          <div className="flex items-center mt-[4px]">
            <div className="bg-green-100 flex justify-center items-center w-[16px] h-[16px] rounded-full">
              <FaArrowUpLong
                color={`${data && data?.value.totalUserRate < 0 ? 'red' : 'green'}`}
                size={8}
              />
            </div>
            <span
              className={`text-${data && data?.value.totalUserRate < 0 ? 'red' : 'green'}-500 text-sm ml-2 `}
            >
              {isLoading && data ? (
                <Skeleton className="flex rounded-full w-20 h-8" />
              ) : (
                `${Math.abs(data?.value.totalUserRate || 0)}% (${data?.value.dayCompareRate} days)`
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
