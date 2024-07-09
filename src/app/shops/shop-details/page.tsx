'use client';
import BreadcrumbsCustom from '@/components/common/Breadcrumbs';
import AdminLayout from '@/components/layouts/AdminLayout';
import Product from '@/components/shop/Product';
import useIdListState from '@/hooks/states/useIdListState';
import apiClient from '@/services/api-services/api-client';
import Products from '@/types/shops/Product';
import Shop from '@/types/shops/Shop';
import { formatCurrency, formatNumber, formatPhoneNumber } from '@/util';
import { Avatar, Button, Divider, Pagination } from '@nextui-org/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';

export default function ShopDetails() {
  const { shopId } = useIdListState();
  const [shopDetail, setShopDetail] = useState<Shop>();
  const [products, setProducts] = useState<Products[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Calculate the products to display for the current page
  const [currentProducts, setCurrentProducts] = useState<Products[]>([]);

  useEffect(() => {
    const firstProductIndex = (currentPage - 1) * productsPerPage;
    const lastProductIndex = firstProductIndex + productsPerPage;
    setCurrentProducts(products.slice(firstProductIndex, lastProductIndex));
  }, [currentPage, products]);

  useEffect(() => {
    (async () => {
      try {
        const responseData = await apiClient.get(`admin/shop/detail?shopId=${shopId}`);
        if (responseData.data.isSuccess) {
          setShopDetail(responseData.data?.value);
        } else {
          throw new Error(responseData.data.error.message);
        }
      } catch (error) {
        console.log('>>> error', error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const responseData = await apiClient.get(`admin/shop/product?shopId=${shopId}`);
        if (responseData.data.isSuccess) {
          setProducts(responseData.data?.value?.items);
          console.log('products', responseData.data?.value?.items);
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
      <div className="px-4 py-2">
        <h1 className="text-3xl font-bold text-primary">Thông tin cửa hàng</h1>
        <BreadcrumbsCustom
          root="shops"
          rootName="Quản lý cửa hàng"
          childrenName="Thông tin cửa hàng"
        />
        <div className="px-8 py-4 shadow-md rounded-lg">
          <div className="flex flex-row justify-between">
            <div className="relative">
              <Image
                src={shopDetail?.bannerUrl ?? ''}
                width={0}
                height={0}
                sizes="100vw"
                className="opacity-50 w-80 h-56"
                alt="banner shop"
                loading="lazy"
              />
              <Avatar
                src={shopDetail?.logoUrl ?? ''}
                className="absolute -translate-y-16 translate-x-40 w-32 h-32"
              />
            </div>
            <div className="w-2/3 flex flex-col">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-primary">{shopDetail?.shopName}</h2>
                <Button
                  className={`text-base text-white bg-green-500 ${shopDetail?.status === 'Đã phê duyệt' ? 'bg-green-500' : 'bg-gray-500'}`}
                >
                  {shopDetail?.status === 'Đã phê duyệt' ? shopDetail?.active : shopDetail?.status}
                </Button>
              </div>
              <p className="text-base text-gray-600 mb-8 mt-2">{shopDetail?.description}</p>
              <div className="flex justify-between">
                <div>
                  <p className="text-lg text-gray-600">
                    Chủ cửa hàng: <strong>{shopDetail?.shopOwnerName}</strong>
                  </p>
                  <p className="text-lg text-gray-600">
                    Tổng doanh thu: <strong>{formatCurrency(shopDetail?.shopRevenue ?? '')}</strong>
                  </p>
                  <p className="text-lg text-gray-600">
                    Tổng đơn hàng: <strong>{formatNumber(shopDetail?.totalOrder ?? '')}</strong>
                  </p>
                  <p className="text-lg text-gray-600">
                    Tổng sản phẩm: <strong>{formatNumber(shopDetail?.totalProduct ?? '')}</strong>
                  </p>
                </div>

                <div>
                  <p className="text-lg text-gray-600">
                    Địa chỉ: <strong>{shopDetail?.address}</strong>
                  </p>
                  <p className="text-lg text-gray-600">
                    Số điện thoại:{' '}
                    <strong>{formatPhoneNumber(shopDetail?.phoneNumber ?? '')}</strong>
                  </p>
                  <p className="text-lg text-gray-600">
                    Email: <strong>{shopDetail?.email}</strong>
                  </p>
                  <p className="text-lg text-gray-600 flex gap-1">
                    Đánh giá từ khách hàng: <strong>{shopDetail?.avgRating ?? ''}</strong>
                    <FaStar className="my-auto" color="#facc15" /> (
                    {formatNumber(shopDetail?.totalRating ?? '')} đánh giá)
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Divider className="mt-24 mb-4" />
          <div>
            {currentProducts.length ? (
              <>
                <h2 className="text-2xl font-bold mb-4">Sản phẩm đang bán:</h2>
                <div className="flex flex-row justify-start flex-wrap">
                  {currentProducts.map((product) => (
                    <Product
                      key={product.id}
                      productId={product.id}
                      shopId={shopDetail?.id ?? 0}
                      image={product.imageUrl}
                      name={product.name}
                      price={product.price}
                      des={product.description}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center text-red-500 text-xl font-bold">
                Không có sản phẩm nào đang được bán
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <Pagination
            showControls
            showShadow
            color="primary"
            page={currentPage}
            total={totalPages}
            onChange={setCurrentPage}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
