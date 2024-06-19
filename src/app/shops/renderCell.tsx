import { shops } from '@/data';
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
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

export const statusColorMap: Record<string, ChipProps['color']> = {
  'Đang hoạt động': 'success',
  'Đang đóng cửa': 'warning',
  'Đã bị cấm': 'danger',
};

export const INITIAL_VISIBLE_COLUMNS = [
  'shopName',
  'shopOwnerName',
  'revenue',
  'status',
  'registerDate',
  'actions',
];

export type Shops = (typeof shops)[0];
export default function RenderCell() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/shops/shop-details');
  };

  const handleBan = () => {
    alert('Banned shop');
  };

  const handleUnban = () => {
    alert('Unbanned shop');
  };

  return useCallback((shop: Shops, columnKey: React.Key) => {
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
                  <DropdownItem onClick={() => handleUnban()}>Bỏ cấm</DropdownItem>
                ) : (
                  <DropdownItem onClick={() => handleBan()}>Cấm</DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
}
