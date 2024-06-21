'use client';
import RenderCell, { INITIAL_VISIBLE_COLUMNS, statusColorMap } from '@/app/shops/renderCell';
import TableCustom from '@/components/common/TableCustom';
import { shopColumns, shopStatus } from '@/data';
import apiClient from '@/services/api-services/api-client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Shops() {
  const [shops, setShops] = useState<any[]>([]);
  const router = useRouter();
  const handleClick = () => {
    router.push('/shops/shop-details');
  };

  useEffect(() => {
    (async () => {
      try {
        const responseData = await apiClient.get('admin/shop/all');
        if (responseData.data.isSuccess) {
          setShops(responseData.data?.value?.items);
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
