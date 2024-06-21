import Shop from '@/types/shops/Shop';
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
  'balance',
  'status',
  'createdDate',
  'actions',
];

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

  const handleApprove = () => {
    alert('Approved shop');
  };

  return useCallback((shop: Shop, columnKey: React.Key) => {
    const cellValue = shop[columnKey as keyof Shop];

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
      case 'createdDate':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small ">{formatDate(shop.createdDate)}</p>
          </div>
        );
      case 'phoneNumber':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small ">{formatPhoneNumber(shop.phoneNumber)}</p>
          </div>
        );
      case 'balance':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{formatCurrency(shop.balance)}</p>
          </div>
        );
      case 'id':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{shop.id}</p>
          </div>
        );
      case 'status':
        return (
          <>
            {shop.status !== 'Đã phê duyệt' ? (
              <Chip
                className="capitalize"
                color={statusColorMap[shop.status]}
                size="sm"
                variant="flat"
              >
                {shop.status}
              </Chip>
            ) : (
              <Chip
                className="capitalize"
                color={statusColorMap[shop.active]}
                size="sm"
                variant="flat"
              >
                {shop.active}
              </Chip>
            )}
          </>
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
                {shop.status === 'Chưa phê duyệt' ? (
                  <DropdownItem onClick={() => handleApprove()}>Duyệt</DropdownItem>
                ) : shop.status === 'Đã bị cấm' ? (
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
