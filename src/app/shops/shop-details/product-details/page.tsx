import BreadcrumbsCustom from '@/components/common/Breadcrumbs';
import AdminLayout from '@/components/layouts/AdminLayout';
import { productDetail } from '@/data';
import { formatCurrency, formatNumber } from '@/util';
import Image from 'next/image';

export default function ProductDetails() {
  return (
    <AdminLayout activeContentIndex={2}>
      <div className="px-4 py-2">
        <h1 className="text-3xl font-bold text-primary">Thông tin sản phẩm</h1>
        <BreadcrumbsCustom
          root="shops"
          rootName="Quản lý cửa hàng"
          extra="shops/shop-details"
          extraName="Thông tin cửa hàng"
          childrenName="Thông tin sản phẩm"
        />
        <div className="p-4 bg-slate-100 rounded-lg flex gap-4">
          <Image
            src={productDetail.image}
            width={180}
            height={180}
            alt="image product"
            loading="lazy"
            quality={100}
            className="rounded-lg"
          />
          <div className="flex flex-col text-lg justify-center">
            <p>
              Tên cửa hàng: <strong>{productDetail.shopName}</strong>
            </p>
            <p>
              Tên sản phẩm: <strong>{productDetail.name}</strong>
            </p>
            <p>
              Mô tả: <strong>{productDetail.des}</strong>
            </p>
            <p>
              Giá bán: <strong>{formatCurrency(productDetail.price)}</strong>
            </p>
            <p>
              Tổng sản phẩm đã bán: <strong>{formatNumber(productDetail.totalOrder)}</strong>
            </p>
            <p>
              Trạng thái: <strong className="text-green-500">{productDetail.status}</strong>
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
