'use client';
import TableCustom from '@/components/common/TableCustom';
import { accountColumns, accounts, accountStatus, accountType } from '@/data';
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
import React, { useCallback } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

const statusColorMap: Record<string, ChipProps['color']> = {
  'Đang hoạt động': 'success',
  'Đã bị cấm': 'danger',
};

const INITIAL_VISIBLE_COLUMNS = ['accountName', 'status', 'accountType', 'registerDate', 'actions'];

type Accounts = (typeof accounts)[0];

const handleClick = () => {
  alert('Accounts clicked');
};

export default function Accounts() {
  const renderCell = useCallback((account: Accounts, columnKey: React.Key) => {
    const cellValue = account[columnKey as keyof Accounts];

    switch (columnKey) {
      case 'accountName':
        return (
          <User
            avatarProps={{ radius: 'full', src: account.avatarUrl }}
            name={account.accountName}
            className="flex justify-start font-semibold"
          >
            {account.accountName}
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
      case 'registerDate':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{formatDate(account.registerDate)}</p>
          </div>
        );
      case 'accountId':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{account.accountId}</p>
          </div>
        );
      case 'accountType':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{account.accountType}</p>
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
              <DropdownMenu>
                <DropdownItem onClick={() => handleClick()}>Xem chi tiết</DropdownItem>
                {account.status === 'Đã bị cấm' ? (
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
      indexPage={3}
      title="Quản lý tài khoản"
      placeHolderSearch="Tìm kiếm theo tên tài khoản..."
      smallText="tài khoản"
      initColumns={INITIAL_VISIBLE_COLUMNS}
      statusColorMap={statusColorMap}
      arrayData={accounts}
      arrayDataColumns={accountColumns}
      arrayDataStatus={accountStatus}
      accountFilter={true}
      accountType={accountType}
      renderCell={renderCell}
      handleClick={handleClick}
    />
  );
}
