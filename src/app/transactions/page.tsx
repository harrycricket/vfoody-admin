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
  const handleClick = (orderId: number) => {
    router.push(`/transactions/order-details?orderId=${orderId}`);
  };

  useEffect(() => {
    (async () => {
      try {
        const responseData = await apiClient.get('admin/order/all?pageSize=200&pageIndex=1');
        if (responseData.data.isSuccess) {
          setTransactions(responseData.data?.value?.items);
        } else {
          console.log(responseData.data.error.message);
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
