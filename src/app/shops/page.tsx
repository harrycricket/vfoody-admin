'use client';
import TableCustom from '@/components/common/TableCustom';
import { shopColumns, shops, shopStatus } from '@/data';
import { formatCurrency, formatDate, formatNumber, formatPhoneNumber } from '@/util';
import {
  Button,
  Chip,
  ChipProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from '@nextui-org/react';
import React, { useCallback } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

const statusColorMap: Record<string, ChipProps['color']> = {
  'Đang hoạt động': 'success',
  'Đang đóng cửa': 'warning',
  'Đã bị cấm': 'danger',
};

const INITIAL_VISIBLE_COLUMNS = [
  'shopName',
  'shopOwnerName',
  'revenue',
  'status',
  'registerDate',
  'actions',
];

type Shops = (typeof shops)[0];

const handleClick = () => {
  alert('Shops clicked');
};

export default function Shops() {
  const renderCell = useCallback((shop: Shops, columnKey: React.Key) => {
    const cellValue = shop[columnKey as keyof Shops];

    switch (columnKey) {
      case 'shopName':
        return (
          <User
            avatarProps={{ radius: 'full', src: shop.logoUrl }}
            name={shop.shopName}
            className="flex justify-start font-semibold"
          >
            {shop.shopName}
          </User>
        );
      case 'shopOwnerName':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{shop.shopOwnerName}</p>
          </div>
        );
      case 'totalOrder':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small ">{formatNumber(shop.totalOrder)}</p>
          </div>
        );
      case 'totalProduct':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small ">{formatNumber(shop.totalProduct)}</p>
          </div>
        );
      case 'registerDate':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small ">{formatDate(shop.registerDate)}</p>
          </div>
        );
      case 'phoneNumber':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small ">{formatPhoneNumber(shop.phoneNumber)}</p>
          </div>
        );
      case 'revenue':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{formatCurrency(shop.revenue)}</p>
          </div>
        );
      case 'shopId':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{shop.shopId}</p>
          </div>
        );
      case 'status':
        return (
          <Chip className="capitalize" color={statusColorMap[shop.status]} size="sm" variant="flat">
            {shop.status}
          </Chip>
        );
      case 'actions':
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="md" variant="light">
                  <BsThreeDotsVertical className="text-black" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem onClick={() => handleClick()}>Xem chi tiết</DropdownItem>
                {shop.status === 'Đã bị cấm' ? (
                  <DropdownItem>Bỏ cấm</DropdownItem>
                ) : (
                  <DropdownItem>Cấm</DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <TableCustom
      indexPage={2}
      title="Quản lý cửa hàng"
      placeHolderSearch="Tìm kiếm theo tên cửa hàng..."
      smallText="cửa hàng"
      initColumns={INITIAL_VISIBLE_COLUMNS}
      statusColorMap={statusColorMap}
      arrayData={shops}
      arrayDataColumns={shopColumns}
      arrayDataStatus={shopStatus}
      renderCell={renderCell}
      handleClick={handleClick}
    />
  );
}
