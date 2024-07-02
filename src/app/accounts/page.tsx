'use client';
import { INITIAL_VISIBLE_COLUMNS, RenderCell, statusColorMap } from '@/app/accounts/renderCell';
import TableCustom from '@/components/common/TableCustom';
import { accountColumns, accountStatus, accountType } from '@/data';
import apiClient from '@/services/api-services/api-client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Accounts() {
  const [accounts, setAccounts] = useState<any[]>([]);
  const router = useRouter();
  const handleClick = (accountId: number) => {
    router.push(`/accounts/account-details?accountId=${accountId}`);
  };

  useEffect(() => {
    (async () => {
      try {
        const responseData = await apiClient.get('admin/account/all?pageSize=200&pageIndex=1');
        if (responseData.data.isSuccess) {
          setAccounts(responseData.data?.value?.items);
        } else {
          throw new Error(responseData.data.error.message);
        }
      } catch (error) {
        console.log('>>> error', error);
      }
    })();
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
      renderCell={RenderCell()}
      handleClick={handleClick}
    />
  );
}
