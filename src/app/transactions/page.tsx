'use client';
import RenderCell, { INITIAL_VISIBLE_COLUMNS, statusColorMap } from '@/app/transactions/renderCell';
import TableCustom from '@/components/common/TableCustom';
import { transactionColumns, transactions, transactionStatus } from '@/data';
import { useRouter } from 'next/navigation';

export default function Transactions() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/transactions/order-details');
  };

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
