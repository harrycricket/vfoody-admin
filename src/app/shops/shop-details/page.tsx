'use client';
import BreadcrumbsCustom from '@/components/common/Breadcrumbs';
import AdminLayout from '@/components/layouts/AdminLayout';
import Product from '@/components/shop/Product';
import { shopInformation } from '@/data';
import { formatCurrency, formatNumber, formatPhoneNumber } from '@/util';
import { Avatar, Button, Divider, Pagination } from '@nextui-org/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';

export default function ShopDetails() {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const totalPages = Math.ceil(shopInformation.products.length / productsPerPage);

  // Calculate the products to display for the current page
  const [currentProducts, setCurrentProducts] = useState<
    { id: number; name: string; des: string; price: number; image: string }[]
  >([]);

  useEffect(() => {
    const firstProductIndex = (currentPage - 1) * productsPerPage;
    const lastProductIndex = firstProductIndex + productsPerPage;
    setCurrentProducts(shopInformation.products.slice(firstProductIndex, lastProductIndex));
  }, [currentPage, shopInformation.products]);

  return (
    <AdminLayout activeContentIndex={2}>
      <div className="px-4 py-2">
        <h1 className="text-3xl font-bold text-primary">Thông tin cửa hàng</h1>
        <BreadcrumbsCustom
          root="shops"
          rootName="Quản lý cửa hàng"
          childrenName="Thông tin cửa hàng"
        />
        <div className="px-8 py-4 bg-slate-100 rounded-lg">
          <div className="flex flex-row justify-between">
            <div className="relative">
              <Image
                src={shopInformation.bannerUrl}
                width={0}
                height={0}
                sizes="100vw"
                className="opacity-50 w-auto h-56"
                alt="banner shop"
                loading="lazy"
              />
              <Avatar
                src={shopInformation.logoUrl}
                className="absolute -translate-y-16 translate-x-40 w-32 h-32"
              />
            </div>
            <div className="max-w-3xl flex flex-col">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-primary">{shopInformation.shopName}</h2>
                <Button className="text-base text-white bg-green-500">
                  {shopInformation.status}
                </Button>
              </div>
              <p className="text-base text-gray-600 mb-8 mt-2">{shopInformation.description}</p>
              <div className="flex justify-between">
                <div>
                  <p className="text-lg text-gray-600">
                    Chủ cửa hàng: <strong>{shopInformation.shopOwnerName}</strong>
                  </p>
                  <p className="text-lg text-gray-600">
                    Tổng doanh thu: <strong>{formatCurrency(shopInformation.revenue)}</strong>
                  </p>
                  <p className="text-lg text-gray-600">
                    Tổng đơn hàng: <strong>{formatNumber(shopInformation.totalOrder)}</strong>
                  </p>
                  <p className="text-lg text-gray-600">
                    Tổng sản phẩm: <strong>{formatNumber(shopInformation.totalProduct)}</strong>
                  </p>
                </div>

                <div>
                  <p className="text-lg text-gray-600">
                    Địa chỉ: <strong>{shopInformation.address}</strong>
                  </p>
                  <p className="text-lg text-gray-600">
                    Số điện thoại: <strong>{formatPhoneNumber(shopInformation.phoneNumber)}</strong>
                  </p>
                  <p className="text-lg text-gray-600">
                    Email: <strong>{shopInformation.email}</strong>
                  </p>
                  <p className="text-lg text-gray-600 flex gap-1">
                    Đánh giá từ khách hàng: <strong>{shopInformation.star}</strong>
                    <FaStar className="my-auto" color="#facc15" /> (
                    {formatNumber(shopInformation.totalRating)} đánh giá)
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Divider className="mt-24 mb-4" />
          <div>
            <h2 className="text-2xl font-bold mb-4">Sản phẩm đang bán:</h2>
            <div className="flex flex-row flex-wrap gap-4 justify-evenly">
              {currentProducts.map((product) => (
                <Product
                  key={product.id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  des={product.des}
                />
              ))}
            </div>
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
