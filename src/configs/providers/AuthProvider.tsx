'use client';
import apiClient from '@/services/api-services/api-client';
import APICommonResponse from '@/types/responses/APICommonResponse';
import { useRouter, usePathname } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = async () => {
    const token = localStorage.getItem('token') || '';
    let result = true;
    await apiClient
      .get<APICommonResponse>('auth/admin')
      .then((response) => {
        result = true;
      })
      .catch((error) => {
        result = false;
      });
    return result;
  };

  if (typeof window !== 'undefined' && !pathname.includes('login') && !isAuthenticated()) {
    router.push('/login');
  }

  return children;
};

export default AuthProvider;
