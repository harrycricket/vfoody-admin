'use client';
import apiClient from '@/services/api-services/api-client';
import APICommonResponse from '@/types/responses/APICommonResponse';
import { Image, Spinner } from '@nextui-org/react';
import { useRouter, usePathname } from 'next/navigation';
import React, { ReactNode, useEffect, useState } from 'react';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const authenticate = async () => {
    const token = localStorage.getItem('token') || '';
    let result = true;
    await apiClient
      .get<APICommonResponse>('auth/admin')
      .then((response) => {
        result = true;
        if (typeof window !== 'undefined' && pathname.includes('login')) router.push('/dashboard');
      })
      .catch(async (error) => {
        result = false;
        if (typeof window !== 'undefined' && !pathname.includes('login')) router.push('/login');
      });
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
    return result;
  };

  useEffect(() => {
    if (typeof window !== 'undefined' || pathname.includes('mln122-grading-mail-noti')) {
      authenticate();
    }
  }, []);

  return isLoading ? (
    <div className="h-screen w-screen flex flex-col gap-3 justify-center items-center">
      <div className="flex gap-3 justify-center items-center">
        <div style={{ marginLeft: '-12px' }}>
          <Image alt="VFoody Logo" height={32} radius="sm" src="../../images/logo.png" width={32} />
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-medium text-primary">VFOODY</h1>
        </div>
      </div>
      <div className="flex gap-3 justify-center items-center mt-2">
        <Spinner color="default" />
        <Spinner color="primary" />
        <Spinner color="secondary" />
        <Spinner color="success" />
        <Spinner color="warning" />
        <Spinner color="danger" />
      </div>
    </div>
  ) : (
    children
  );
};

export default AuthProvider;
