import BreadcrumbsCustom from '@/components/common/Breadcrumbs';
import AdminLayout from '@/components/layouts/AdminLayout';
import { accountDetail } from '@/data';
import { formatCurrency, formatDate } from '@/util';
import Image from 'next/image';

export default function AccountDetails() {
  return (
    <AdminLayout activeContentIndex={3}>
      <div className="px-4 py-2">
        <h1 className="text-3xl font-bold text-primary">Thông tin tài khoản</h1>
        <BreadcrumbsCustom
          root="accounts"
          rootName="Quản lý tài khoản"
          childrenName="Thông tin tài khoản"
        />
        <div className="p-4 bg-slate-100 rounded-lg flex gap-4">
          <Image
            src={accountDetail.avatarUrl}
            width={180}
            height={180}
            alt="image product"
            loading="lazy"
            quality={100}
            className="rounded-lg"
          />
          <div className="flex flex-col text-lg justify-center">
            <p>
              Tên tài khoản: <strong>{accountDetail.accountName}</strong>
            </p>
            <p>
              Email: <strong>{accountDetail.email}</strong>
            </p>
            <p>
              Số điện thoại: <strong>{accountDetail.phoneNumber}</strong>
            </p>
            <p>
              Loại người dùng: <strong>{formatCurrency(accountDetail.accountType)}</strong>
            </p>
            <p>
              Ngày đăng ký tài khoản: <strong>{formatDate(accountDetail.registerDate)}</strong>
            </p>
            <p>
              Trạng thái: <strong className="text-green-500">{accountDetail.status}</strong>
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
