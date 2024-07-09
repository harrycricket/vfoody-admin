'use client';
import BreadcrumbsCustom from '@/components/common/Breadcrumbs';
import AdminLayout from '@/components/layouts/AdminLayout';
import useIdListState from '@/hooks/states/useIdListState';
import apiClient from '@/services/api-services/api-client';
import Products from '@/types/shops/Product';
import { formatCurrency } from '@/util';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ProductDetails() {
  const { shopId, productId } = useIdListState();
  const [productDetail, setProductDetail] = useState<Products>();

  useEffect(() => {
    (async () => {
      try {
        const responseData = await apiClient.get(
          `admin/product/detail?productId=${productId}&shopId=${shopId}`,
        );
        if (responseData.data.isSuccess) {
          setProductDetail(responseData.data?.value);
        } else {
          throw new Error(responseData.data.error.message);
        }
      } catch (error) {
        console.log('>>> error', error);
      }
    })();
  }, []);

  return (
    <AdminLayout activeContentIndex={2}>
      <div className="pl-4 pr-8 py-2">
        <h1 className="text-3xl font-bold text-primary">Thông tin sản phẩm</h1>
        <BreadcrumbsCustom
          root="shops"
          rootName="Quản lý cửa hàng"
          extra={`shops/shop-details?shopId=${shopId}`}
          extraName="Thông tin cửa hàng"
          childrenName="Thông tin sản phẩm"
        />
        <div className="p-4 shadow-md rounded-lg flex gap-4">
          <Image
            src={productDetail?.imageUrl ?? ''}
            width={180}
            height={180}
            alt="image product"
            loading="lazy"
            quality={100}
            className="rounded-lg"
          />
          <div className="flex flex-col text-lg justify-center">
            <p>
              Tên sản phẩm: <strong>{productDetail?.name}</strong>
            </p>
            <p>
              Mô tả: <strong>{productDetail?.description}</strong>
            </p>
            <p>
              Giá bán: <strong>{formatCurrency(productDetail?.price)}</strong>
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
