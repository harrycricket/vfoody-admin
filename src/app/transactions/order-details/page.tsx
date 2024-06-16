'use client';
import BreadcrumbsCustom from '@/components/common/Breadcrumbs';
import AdminLayout from '@/components/layouts/AdminLayout';
import { transactionDetail } from '@/data';
import { formatCurrency, formatTimeToSeconds } from '@/util';
import { Divider } from '@nextui-org/react';
import Image from 'next/image';

export default function OrderDetails() {
  return (
    <AdminLayout activeContentIndex={1}>
      <div className="px-4 py-2">
        <h1 className="text-3xl font-bold text-primary">Đơn hàng chi tiết</h1>
        <BreadcrumbsCustom
          root="transactions"
          rootName="Quản lý giao dịch"
          childrenName="Đơn hàng chi tiết"
        />
        <div className="p-8 bg-slate-100 rounded-lg">
          <div className="flex flex-col mr-auto w-1/2 text-lg mb-2">
            <div className="flex justify-between">
              <p>Tên khách hàng:</p>
              <p className="font-semibold">{transactionDetail.customerName}</p>
            </div>
            <div className="flex justify-between">
              <p>Địa chỉ nhận hàng:</p>
              <p className="font-semibold">{transactionDetail.address}</p>
            </div>
            <div className="flex justify-between">
              <p>Tên cửa hàng:</p>
              <p className="font-semibold">{transactionDetail.shopName}</p>
            </div>
            <div className="flex justify-between">
              <p>Thời gian giao dịch:</p>
              <p className="font-semibold">{formatTimeToSeconds(transactionDetail.orderDate)}</p>
            </div>
          </div>
          <Divider />
          {transactionDetail?.products.map((product) => (
            <>
              <div key={product.productId} className="flex justify-between items-center py-4">
                <div className="flex gap-4">
                  <Image src={product.image} alt="Product image" width={120} height={120} />
                  <div className="flex flex-col justify-center">
                    <p className="text-xl">
                      {product.name}
                      <strong className="ml-4">x{product.quantity}</strong>
                    </p>
                    {product.question.map((q) => {
                      return (
                        <div key={q.id}>
                          {q.price ? (
                            <p>
                              {q.name}: {q.value} (+{formatCurrency(q.price)})
                            </p>
                          ) : (
                            <p>
                              {q.name}: {q.value}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <strong className="text-primary text-xl">
                  {formatCurrency(
                    product.price * product.quantity +
                      product?.question?.reduce(
                        (acc, q) => (q.price ? acc + q.price * product.quantity : acc),
                        0,
                      ),
                  )}
                </strong>
              </div>
              <Divider />
            </>
          ))}
          <p className="py-4">
            <strong>Ghi chú thêm:</strong> {transactionDetail.note}
          </p>
          <Divider />
          <div className="flex flex-col ml-auto w-1/3 pt-4 text-lg">
            <div className="flex justify-between">
              <p>Tổng giá trị đơn hàng:</p>
              <p className="text-primary font-bold">
                {formatCurrency(transactionDetail.totalPrice)}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Trạng thái đơn hàng:</p>
              <p
                className={
                  transactionDetail.status === 'Đã hoàn thành'
                    ? 'text-success-500 font-bold capitalize'
                    : transactionDetail.status === 'Đã hủy'
                      ? 'text-danger-500 font-bold capitalize'
                      : 'text-warning-500 font-bold capitalize'
                }
              >
                {transactionDetail.status}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
