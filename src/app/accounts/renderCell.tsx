import Account from '@/types/accounts/Account';
import { formatDate, formatPhoneNumber } from '@/util';
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

export const INITIAL_VISIBLE_COLUMNS = ['fullName', 'status', 'role', 'createdDate', 'actions'];

export const statusColorMap: Record<string, ChipProps['color']> = {
  'Đang hoạt động': 'success',
  'Đã bị cấm': 'danger',
};

export const RenderCell = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push('/accounts/account-details');
  };

  const handleBan = () => {
    alert('Banned account');
  };

  const handleUnban = () => {
    alert('Unbanned account');
  };

  return useCallback((account: Account, columnKey: React.Key) => {
    const cellValue = account[columnKey as keyof Account];

    switch (columnKey) {
      case 'fullName':
        return (
          <User
            avatarProps={{ radius: 'full', src: account.avatarUrl }}
            name={account.fullName}
            className="flex justify-start font-semibold"
          >
            {account.fullName}
          </User>
        );
      case 'email':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{account.email}</p>
          </div>
        );
      case 'phoneNumber':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{formatPhoneNumber(account.phoneNumber)}</p>
          </div>
        );
      case 'createdDate':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{formatDate(account.createdDate)}</p>
          </div>
        );
      case 'id':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{account.id}</p>
          </div>
        );
      case 'role':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{account.role}</p>
          </div>
        );
      case 'status':
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[account.status]}
            size="sm"
            variant="flat"
          >
            {account.status}
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
              {account.status === 'Chưa xác thực' ? (
                <DropdownMenu>
                  <DropdownItem onClick={() => handleClick()}>Xem chi tiết</DropdownItem>
                </DropdownMenu>
              ) : (
                <DropdownMenu>
                  <DropdownItem onClick={() => handleClick()}>Xem chi tiết</DropdownItem>
                  {account.status === 'Đã bị cấm' ? (
                    <DropdownItem onClick={() => handleUnban()}>Bỏ cấm</DropdownItem>
                  ) : (
                    <DropdownItem onClick={() => handleBan()}>Cấm</DropdownItem>
                  )}
                </DropdownMenu>
              )}
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
};
