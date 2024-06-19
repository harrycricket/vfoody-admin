'use client';
import RenderCell, { INITIAL_VISIBLE_COLUMNS, statusColorMap } from '@/app/shops/renderCell';
import TableCustom from '@/components/common/TableCustom';
import { shopColumns, shops, shopStatus } from '@/data';
import { useRouter } from 'next/navigation';

export default function Shops() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/shops/shop-details');
  };

  return (
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
      renderCell={RenderCell()}
      handleClick={handleClick}
    />
  );
}
