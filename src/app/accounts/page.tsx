'use client';
import DashboardTimeFilter from '@/components/dashboard/DashboardTimeFilter';
import AdminLayout from '@/components/layouts/AdminLayout';

export default function Accounts() {
  return (
    <AdminLayout activeContentIndex={3}>
      <div className="px-4 py-2">
        <h1 className="text-3xl font-bold text-primary">Quản lý tài khoản</h1>
        <div className="flex items-center justify-end mb-4">
          <DashboardTimeFilter />
        </div>
      </div>
    </AdminLayout>
  );
}
