'use client';
import BreadcrumbsCustom from '@/components/common/Breadcrumbs';
import AdminLayout from '@/components/layouts/AdminLayout';
import useIdListState from '@/hooks/states/useIdListState';
import apiClient from '@/services/api-services/api-client';
import Account from '@/types/accounts/Account';
import { formatDate, formatPhoneNumber } from '@/util';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function AccountDetails() {
  const { accountId } = useIdListState();
  const [accountDetail, setAccountDetail] = useState<Account>();

  useEffect(() => {
    (async () => {
      try {
        const responseData = await apiClient.get(`admin/account/info?accountId=${accountId}`);
        if (responseData.data.isSuccess) {
          setAccountDetail(responseData.data?.value);
          console.log('accountDetail', responseData.data?.value);
        } else {
          throw new Error(responseData.data.error.message);
        }
      } catch (error) {
        console.log('>>> error', error);
      }
    })();
  }, []);

  return (
    <AdminLayout activeContentIndex={3}>
      <div className="px-4 py-2">
        <h1 className="text-3xl font-bold text-primary">Thông tin tài khoản</h1>
        <BreadcrumbsCustom
          root="accounts"
          rootName="Quản lý tài khoản"
          childrenName="Thông tin tài khoản"
        />
        <div className="p-4 shadow-md rounded-lg flex gap-4">
          <Image
            src={accountDetail?.avatarUrl || ''}
            width={200}
            height={200}
            alt="image account"
            loading="lazy"
            quality={100}
            className="rounded-lg w-44 h-44 object-cover"
          />
          <div className="flex flex-col text-lg justify-center">
            <p>
              Tên tài khoản: <strong>{accountDetail?.fullName || ''}</strong>
            </p>
            <p>
              Email: <strong>{accountDetail?.email}</strong>
            </p>
            <p>
              Số điện thoại: <strong>{formatPhoneNumber(accountDetail?.phoneNumber || '')}</strong>
            </p>
            <p>
              Loại người dùng: <strong>{accountDetail?.roleName || ''}</strong>
            </p>
            <p>
              Ngày đăng ký tài khoản:{' '}
              <strong>{formatDate(accountDetail?.createdDate || '')}</strong>
            </p>
            <p>
              Trạng thái:{' '}
              <strong
                className={`${
                  accountDetail?.status === 'Đang hoạt động'
                    ? 'text-green-500'
                    : accountDetail?.status === 'Đã bị cấm'
                      ? 'text-red-500'
                      : 'text-gray-500'
                }`}
              >
                {accountDetail?.status}
              </strong>
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
