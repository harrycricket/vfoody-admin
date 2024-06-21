'use client';
import { NextPage } from 'next';
import TableCommonCustom, { TableCustomFilter } from '@/components/common/TableCommonCustom';
import { promotionApplyTypes, promotionColumns, promotionStatuses } from '@/data';
import { Avatar, Selection } from '@nextui-org/react';
import { ReactNode, useCallback, useState } from 'react';
import PlatformPromotionModel from '@/types/models/PlatformPromotionModel';
import { formatDate, formatDateString } from '@/services/util-services/TimeFormatService';
import useFetchWithReactQuery from '@/hooks/fetching/useFetchWithRQ';
import PlatformPromotionQuery from '@/types/queries/PlatformPromotionQuery';
import REACT_QUERY_CACHE_KEYS from '@/data/constants/react-query-cache-keys';
import { platfromPromotionApiService } from '@/services/api-services/api-service-instances';
import PageableModel from '@/types/models/PageableModel';
import PagingRequestQuery from '@/types/queries/PagingRequestQuery';

const PromotionPage: NextPage = () => {
  const [statuses, setStatuses] = useState<Selection>('all');
  const [applyTypes, setApplyTypes] = useState<Selection>('all');
  const [query, setQuery] = useState<PlatformPromotionQuery>({
    pageIndex: 1,
    pageSize: 4,
    status: 0,
    applyType: 0,
    title: '',
    description: '',
  } as PlatformPromotionQuery);
  const {
    data: promotions,
    isLoading,
    error,
  } = useFetchWithReactQuery<PlatformPromotionModel, PlatformPromotionQuery>(
    REACT_QUERY_CACHE_KEYS.PROMOTION_PLATFROM,
    platfromPromotionApiService,
    query,
  );
  const statusFilterOptions = [{ key: 0, desc: 'Tất cả' }].concat(
    promotionStatuses.map((item) => ({ key: item.key, desc: item.label })),
  );

  const statusFilter = {
    label: 'Trạng thái',
    mappingField: 'status',
    selectionMode: 1,
    options: statusFilterOptions,
    selectedValues: statuses,
    handleFunc: (values: Selection) => {
      let value = Array.from(values).map((val) => parseInt(val.toString()))[0];
      setStatuses(values);
      setQuery({ ...query, status: value });
      console.log('Filter selected status: ', value);
    },
  } as TableCustomFilter;

  const applyTypeFilterOptions = [{ key: 0, desc: 'Tất cả' }].concat(
    promotionApplyTypes.map((item) => ({ key: item.key, desc: item.label })),
  );

  const applyTypeFilter = {
    label: 'Loại áp dụng',
    mappingField: 'applyType',
    selectionMode: 1,
    options: applyTypeFilterOptions,
    selectedValues: applyTypes,
    handleFunc: (values: Selection) => {
      let value = Array.from(values).map((val) => parseInt(val.toString()))[0];
      setApplyTypes(values);
      setQuery({ ...query, status: value });
      console.log('Filter selected status: ', value);
    },
  } as TableCustomFilter;

  const renderCell = useCallback(
    (promotion: PlatformPromotionModel, columnKey: React.Key): ReactNode => {
      const cellValue = promotion[columnKey as keyof PlatformPromotionModel];

      switch (columnKey) {
        case 'bannerUrl':
          return (
            <div className="flex flex-col">
              <Avatar src={promotion.bannerUrl} />
            </div>
          );
        case 'title':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small">{promotion.title}</p>
            </div>
          );
        case 'startDate':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small">{formatDateString(promotion.startDate)}</p>
            </div>
          );
        case 'endDate':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small">{formatDateString(promotion.endDate)}</p>
            </div>
          );
        case 'status':
          return (
            <div className="flex flex-col ">
              <span
                className={
                  promotion.status == 1
                    ? 'w-fit bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300'
                    : promotion.status == 2
                      ? 'w-fit bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300'
                      : 'w-fit bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300'
                }
              >
                {promotionStatuses.find((item) => item.key == promotion.status)?.label}
              </span>
            </div>
          );
        case 'numberOfUsed':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small">
                {promotion.numberOfUsed + ' / ' + promotion.usageLimit}
              </p>
            </div>
          );
        default:
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small">{cellValue.toString()}</p>
            </div>
          );
      }
    },
    [],
  );

  return (
    <TableCommonCustom
      indexPage={4}
      title="Chương trình khuyến mãi"
      description="Danh sách chương trình khuyến mãi và ưu đãi của nền tảng"
      initColumns={['id', 'bannerUrl', 'title', 'startDate', 'endDate', 'status', 'numberOfUsed']}
      searchHandler={(value: string) => {
        setQuery({ ...query, title: value, description: value });
      }}
      placeHolderSearch="Tìm kiếm khuyến mãi..."
      arrayData={promotions?.value?.items ?? []}
      arrayDataColumns={promotionColumns}
      pagination={promotions?.value as PageableModel}
      goToPage={(index: number) => setQuery({ ...query, pageIndex: index })}
      setPageSize={(size: number) => setQuery({ ...query, pageSize: size })}
      filters={[statusFilter, applyTypeFilter]}
      renderCell={renderCell}
      onReset={() => setQuery({} as PlatformPromotionQuery)}
    />
  );
};

export default PromotionPage;
