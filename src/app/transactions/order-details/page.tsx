'use client';
import BreadcrumbsCustom from '@/components/common/Breadcrumbs';
import AdminLayout from '@/components/layouts/AdminLayout';
import useIdListState from '@/hooks/states/useIdListState';
import apiClient from '@/services/api-services/api-client';
import Transaction from '@/types/transactions/Transaction';
import { formatCurrency, formatPhoneNumber, formatTimeToSeconds } from '@/util';
import { Divider } from '@nextui-org/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function OrderDetails() {
  const { orderId } = useIdListState();
  const [orderDetail, setOrderDetail] = useState<Transaction>();

  useEffect(() => {
    (async () => {
      try {
        const responseData = await apiClient.get(`customer/order/${orderId}`);

        if (responseData.data.isSuccess) {
          setOrderDetail(responseData.data?.value);
        } else {
          throw new Error(responseData.data.error.message);
        }
      } catch (error) {
        console.log('>>> error', error);
      }
    })();
  }, []);

  return (
    <AdminLayout activeContentIndex={1}>
      <div className="px-4 py-2">
        <h1 className="text-3xl font-bold text-primary">Đơn hàng chi tiết</h1>
        <BreadcrumbsCustom
          root="transactions"
          rootName="Quản lý giao dịch"
          childrenName="Đơn hàng chi tiết"
        />
        <div className="px-8 py-4 shadow-md rounded-lg">
          <div className="flex flex-col mr-auto w-1/2 text-lg mb-4">
            <div className="flex justify-between">
              <p>Tên người nhận hàng:</p>
              <p className="font-semibold">{orderDetail?.orderInfo.fullName}</p>
            </div>
            <div className="flex justify-between">
              <p>Địa chỉ nhận hàng:</p>
              <p className="font-semibold">{orderDetail?.orderInfo?.building.address}</p>
            </div>
            <div className="flex justify-between">
              <p>Số điện thoại người nhận:</p>
              <p className="font-semibold">
                {formatPhoneNumber(orderDetail?.orderInfo?.phoneNumber ?? '')}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Tên cửa hàng:</p>
              <p className="font-semibold">{orderDetail?.shopInfo?.name}</p>
            </div>
            <div className="flex justify-between">
              <p>Thời gian giao dịch:</p>
              <p className="font-semibold">
                {formatTimeToSeconds(orderDetail?.orderInfo?.durationShipping ?? '')}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Trạng thái đơn hàng:</p>
              <p
                className={
                  orderDetail?.orderInfo?.orderStatus === 4
                    ? 'text-success-500 font-bold capitalize'
                    : orderDetail?.orderInfo?.orderStatus === 5 ||
                        orderDetail?.orderInfo?.orderStatus === 6 ||
                        orderDetail?.orderInfo?.orderStatus === 7
                      ? 'text-danger-500 font-bold capitalize'
                      : 'text-purple-500 font-bold capitalize'
                }
              >
                {orderDetail?.orderInfo?.orderStatus === 4
                  ? 'Đã hoàn thành'
                  : orderDetail?.orderInfo?.orderStatus === 5 ||
                      orderDetail?.orderInfo?.orderStatus === 7
                    ? `Đã hủy (${orderDetail?.orderInfo?.reason})`
                    : orderDetail?.orderInfo?.orderStatus === 6
                      ? 'Giao không thành công'
                      : 'Đang thực hiện'}
              </p>
            </div>
          </div>
          <Divider />
          {orderDetail?.products.map((product) => (
            <>
              <div key={product.productId} className="flex justify-between items-center py-4">
                <div>
                  <div className="flex gap-4">
                    <Image src={product.imageUrl} alt="Product image" width={120} height={120} />
                    <div className="flex flex-col justify-center">
                      <div className="text-xl">
                        {product.productName} ({formatCurrency(product.productPrice)})
                        <p>
                          <strong>x{product.productQuantity}</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                  {product.topping.map(
                    (q) =>
                      q.options?.length > 0 && (
                        <>
                          <p className="font-bold text-slate-500 mt-4">{q.queDescription}:</p>
                          {q.options.map((option) =>
                            option.optionPrice > 0 ? (
                              <p className="text-slate-500" key={option.optionId}>
                                - {option.opDescription} (+
                                {formatCurrency(option.optionPrice * product.productQuantity)})
                              </p>
                            ) : (
                              <p className="text-slate-500" key={option.optionId}>
                                - {option.opDescription}
                              </p>
                            ),
                          )}
                        </>
                      ),
                  )}
                </div>
                <strong className="text-xl">{formatCurrency(product.totalProductPrice)}</strong>
              </div>
              <Divider />
            </>
          ))}
          <p className="py-4">
            <strong>Ghi chú thêm:</strong>
            {orderDetail?.orderInfo.note
              .split('\n')
              .map((item, index) => <p key={index}>{item}</p>)}
          </p>
          <Divider />
          <div className="flex flex-col ml-auto w-1/3 pt-4 text-lg">
            <div className="flex justify-between">
              <p>Tổng hoá đơn:</p>
              <p className="">{formatCurrency(orderDetail?.orderInfo.totalPrice ?? '')}</p>
            </div>
            <div className="flex justify-between">
              <p>Phí giao hàng:</p>
              <p className="">{formatCurrency(orderDetail?.orderInfo.shippingFee ?? '')}</p>
            </div>
            <div className="flex justify-between">
              <p>Giảm giá:</p>
              <p className="">{formatCurrency(orderDetail?.orderInfo.totalPromotion ?? '')}</p>
            </div>
            <div className="flex justify-between text-primary font-bold text-2xl">
              <p>Thành tiền:</p>
              <p>
                {formatCurrency(
                  (orderDetail?.orderInfo.totalPrice ?? 0) +
                    (orderDetail?.orderInfo.shippingFee ?? 0) -
                    (orderDetail?.orderInfo.totalPromotion ?? 0),
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
