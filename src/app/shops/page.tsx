'use client';
import TableCustom from '@/components/common/TableCustom';
import { shopColumns, shopStatus } from '@/data';
import useIdListState from '@/hooks/states/useIdListState';
import apiClient from '@/services/api-services/api-client';
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

const INITIAL_VISIBLE_COLUMNS = [
  'shopName',
  'shopOwnerName',
  'balance',
  'status',
  'createdDate',
  'actions',
];

const statusColorMap: Record<string, ChipProps['color']> = {
  'Đang hoạt động': 'success',
  'Đang đóng cửa': 'warning',
  'Đã bị cấm': 'danger',
};

export default function Shops() {
  const { setShopId } = useIdListState();
  const [shops, setShops] = useState<any[]>([]);
  const [shopIdSelected, setShopIdSelected] = useState<number>(0);
  const [reason, setReason] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleClick = (shopId: number) => {
    setShopId(shopId);
    router.push(`/shops/shop-details?shopId=${shopId}`);
  };

  const handleInputChange = (event: any) => {
    setError('');
    setReason(event.target.value);
  };

  const handleBan = async (shopId: number, onClose: any) => {
    if (!reason) {
      setError('Vui lòng nhập lý do');
      return;
    }
    try {
      const payload = {
        shopId,
        reason,
      };
      const responseData = await apiClient.put('admin/shop/ban', payload);
      if (responseData.data.isSuccess) {
        onClose();
        setToast(responseData.data.value);
      } else {
        throw new Error(responseData.data.error.message);
      }
    } catch (error) {
      console.log('>>> error', error);
    }
  };

  const handleUnban = async (shopId: number, onClose: any) => {
    if (!reason) {
      setError('Vui lòng nhập lý do');
      return;
    }
    try {
      const payload = {
        shopId,
        reason,
      };
      const responseData = await apiClient.put('admin/shop/unban', payload);
      if (responseData.data.isSuccess) {
        onClose();
        setToast(responseData.data.value);
      } else {
        throw new Error(responseData.data.error.message);
      }
    } catch (error) {
      console.log('>>> error', error);
    }
  };

  const handleApprove = async (shopId: number) => {
    try {
      const payload = {
        shopId,
      };
      const responseData = await apiClient.put('admin/shop/approve', payload);
      if (responseData.data.isSuccess) {
        setToast(responseData.data.value);
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
        const payload = {};
        const responseData = await apiClient.post('admin/shop/all', payload);
        if (responseData.data.isSuccess) {
          setShops(responseData.data?.value?.items);
        } else {
          throw new Error(responseData.data.error.message);
        }
      } catch (error) {
        console.log('>>> error', error);
      }
    })();
  }, [toast]);

  const renderCell = useCallback((shop: Shop, columnKey: React.Key) => {
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
            <p className="text-bold text-small">{formatCurrency(shop.shopRevenue)}</p>
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
            {shop.status === 'Đã phê duyệt' ? (
              <Chip
                className="capitalize"
                color={statusColorMap[shop.active]}
                size="sm"
                variant="flat"
              >
                {shop.active}
              </Chip>
            ) : (
              <Chip
                className="capitalize"
                color={statusColorMap[shop.status]}
                size="sm"
                variant="flat"
              >
                {shop.status}
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
                <DropdownItem onClick={() => handleClick(shop.id)}>Xem chi tiết</DropdownItem>
                {shop.status === 'Chưa phê duyệt' ? (
                  <DropdownItem onClick={() => handleApprove(shop.id)}>Duyệt</DropdownItem>
                ) : shop.status === 'Đã bị cấm' ? (
                  <DropdownItem
                    onClick={() => {
                      setShopIdSelected(shop.id);
                      setStatus('banned');
                      onOpen();
                    }}
                  >
                    Bỏ cấm
                  </DropdownItem>
                ) : (
                  <DropdownItem
                    onClick={() => {
                      setShopIdSelected(shop.id);
                      setStatus('active');
                      onOpen();
                    }}
                  >
                    Cấm
                  </DropdownItem>
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
    <>
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
                      ? handleBan(shopIdSelected, onClose)
                      : handleUnban(shopIdSelected, onClose)
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
