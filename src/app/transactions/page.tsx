'use client';
import RenderCell, { INITIAL_VISIBLE_COLUMNS, statusColorMap } from '@/app/transactions/renderCell';
import TableCustom from '@/components/common/TableCustom';
import { transactionColumns, transactionStatus } from '@/data';
import apiClient from '@/services/api-services/api-client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Transactions() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const router = useRouter();
  const handleClick = () => {
    router.push('/transactions/order-details');
  };

  useEffect(() => {
    (async () => {
      try {
        const responseData = await apiClient.get('admin/order/all');
        if (responseData.data.isSuccess) {
          setTransactions(responseData.data?.value?.items);
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
      indexPage={1}
      title="Quản lý giao dịch"
      placeHolderSearch="Tìm kiếm theo tên cửa hàng.."
      smallText="giao dịch"
      initColumns={INITIAL_VISIBLE_COLUMNS}
      statusColorMap={statusColorMap}
      arrayData={transactions}
      arrayDataColumns={transactionColumns}
      arrayDataStatus={transactionStatus}
      renderCell={RenderCell()}
      handleClick={handleClick}
    />
  );
}
