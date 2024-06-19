'use client';
import { INITIAL_VISIBLE_COLUMNS, RenderCell, statusColorMap } from '@/app/accounts/renderCell';
import TableCustom from '@/components/common/TableCustom';
import { accountColumns, accounts, accountStatus, accountType } from '@/data';
import { useRouter } from 'next/navigation';

export default function Accounts() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/accounts/account-details');
  };

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
