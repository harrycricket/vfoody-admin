'use client';
import { NextPage } from 'next';
import TableCommonCustom, { TableCustomFilter } from '@/components/common/TableCommonCustom';
import { promotionApplyTypes, promotionColumns, promotionStatuses, promotions } from '@/data';
import {
  Avatar,
  Button,
  Chip,
  ChipProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from '@nextui-org/react';
import { ReactNode, useCallback } from 'react';
import PlatformPromotionModel from '@/types/models/PlatformPromotionModel';
import { formatDate } from '@/services/util-services/TimeFormatService';

const PromotionPage: NextPage = () => {
  const statusFilterOptions = [{ key: 0, desc: 'Tất cả' }].concat(
    promotionStatuses.map((item) => ({ key: item.key, desc: item.label })),
  );

  const statusFilter = {
    label: 'Trạng thái',
    mappingField: 'status',
    options: statusFilterOptions,
    selectedValue: 0,
    handleFunc: (value: number) => console.log('Filter selected status: ', value),
  } as TableCustomFilter;

  const applyTypeFilterOptions = [{ key: 0, desc: 'Tất cả' }].concat(
    promotionApplyTypes.map((item) => ({ key: item.key, desc: item.label })),
  );

  const applyTypeFilter = {
    label: 'Loại áp dụng',
    mappingField: 'applyType',
    options: applyTypeFilterOptions,
    selectedValue: 0,
    handleFunc: (value: number) => console.log('Filter selected apply type: ', value),
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
              <p className="text-bold text-small">{formatDate(promotion.startDate)}</p>
            </div>
          );
        case 'endDate':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small">{formatDate(promotion.endDate)}</p>
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
      title="Promotions"
      initColumns={['id', 'bannerUrl', 'title', 'startDate', 'endDate', 'status', 'numberOfUsed']}
      placeHolderSearch="Tìm kiếm khuyến mãi..."
      dataName="chương trình khuyến mãi của nền tảng"
      arrayData={promotions}
      arrayDataColumns={promotionColumns}
      searchFields={['title']}
      filters={[statusFilter, applyTypeFilter]}
      renderCell={renderCell}
    />
  );
};

export default PromotionPage;
