'use client';
import AdminLayout from '@/components/layouts/AdminLayout';
import React from 'react';

export default function Reports() {
  return (
    <AdminLayout activeContentIndex={5}>
      <div className="px-4 py-2">
        <h1 className="text-3xl font-bold text-primary">Quản lý báo cáo</h1>
        <p className="text-lg text-center font-bold my-auto text-danger-500">
          Tính năng này đang được thực hiện
        </p>
      </div>
    </AdminLayout>
  );
}
