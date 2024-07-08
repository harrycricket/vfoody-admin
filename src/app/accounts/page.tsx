'use client';
import TableCustom from '@/components/common/TableCustom';
import { accountColumns, accountStatus, accountType } from '@/data';
import apiClient from '@/services/api-services/api-client';
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
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  User,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import 'react-toastify/dist/ReactToastify.css';

const INITIAL_VISIBLE_COLUMNS = ['fullName', 'status', 'role', 'createdDate', 'actions'];

const statusColorMap: Record<string, ChipProps['color']> = {
  'Đang hoạt động': 'success',
  'Đã bị cấm': 'danger',
};

export default function Accounts() {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [accountIdSelected, setAccountIdSelected] = useState<number>(0);
  const [reason, setReason] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  // const [toast, setToast] = useState('');

  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleClick = (accountId: number) => {
    router.push(`/accounts/account-details?accountId=${accountId}`);
  };

  const handleInputChange = (event: any) => {
    setError('');
    setReason(event.target.value);
  };

  const handleBan = async (accountId: number, onClose: any) => {
    if (!reason) {
      setError('Vui lòng nhập lý do');
      return;
    }
    try {
      const payload = {
        accountId,
        reason,
      };
      const responseData = await apiClient.put('admin/account/ban', payload);
      if (responseData.data.isSuccess) {
        onClose();
      } else {
        throw new Error(responseData.data.error.message);
      }
    } catch (error) {
      console.log('>>> error', error);
    }
  };

  const handleUnban = async (accountId: number, onClose: any) => {
    if (!reason) {
      setError('Vui lòng nhập lý do');
      return;
    }
    try {
      const payload = {
        accountId,
        reason,
      };
      const responseData = await apiClient.put('admin/account/unban', payload);
      if (responseData.data.isSuccess) {
        onClose();
      } else {
        throw new Error(responseData.data.error.message);
      }
    } catch (error) {
      console.log('>>> error', error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const responseData = await apiClient.get('admin/account/all?pageSize=200&pageIndex=1');
        if (responseData.data.isSuccess) {
          setAccounts(responseData.data?.value?.items);
          console.log(responseData.data?.value?.items);
        } else {
          throw new Error(responseData.data.error.message);
        }
      } catch (error) {
        console.log('>>> error', error);
      }
    })();
  }, [isOpen]);

  const renderCell = useCallback((account: Account, columnKey: React.Key) => {
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
      case 'roleName':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{account.roleName}</p>
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
                  <DropdownItem onClick={() => handleClick(account.id)}>Xem chi tiết</DropdownItem>
                </DropdownMenu>
              ) : (
                <DropdownMenu>
                  <DropdownItem onClick={() => handleClick(account.id)}>Xem chi tiết</DropdownItem>
                  {account.status === 'Đã bị cấm' ? (
                    <DropdownItem
                      onClick={() => {
                        setAccountIdSelected(account.id);
                        setStatus('banned');
                        onOpen();
                      }}
                    >
                      Bỏ cấm
                    </DropdownItem>
                  ) : (
                    <DropdownItem
                      onClick={() => {
                        setAccountIdSelected(account.id);
                        setStatus('active');
                        onOpen();
                      }}
                    >
                      Cấm
                    </DropdownItem>
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

  return (
    <>
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

      <Modal
        isOpen={isOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setReason('');
          }
          onOpenChange();
        }}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Vui lòng nhập lý do</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  placeholder="Nhập lý do"
                  variant="bordered"
                  value={reason}
                  onChange={handleInputChange}
                />
                {error && <p className="text-sm text-danger-500">{error}</p>}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={onClose}>
                  Đóng
                </Button>
                <Button
                  color="primary"
                  onClick={() =>
                    status === 'active'
                      ? handleBan(accountIdSelected, onClose)
                      : handleUnban(accountIdSelected, onClose)
                  }
                >
                  Xác nhận
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
