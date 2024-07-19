'use client';
import apiClient from '@/services/api-services/api-client';
import APICommonResponse from '@/types/responses/APICommonResponse';
import { Spinner } from '@nextui-org/react';
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
      })
      .catch(async (error) => {
        result = false;
        if (typeof window !== 'undefined' && !pathname.includes('login'))
          await router.push('/login');
      });
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
    return result;
  };

  useEffect(() => {
    authenticate();
  }, []);
  return isLoading ? (
    <div className="flex flex-col gap-4 items-center justify-center w-100 mt-8">
      <h1 className="text-primary font-bold">VFOODY</h1>
      <br />
      <h3 style={{ marginTop: '-44px' }}>VINHOMES FOOD ORDERING APPLICATION</h3>
      <br />
      <Spinner color="default" />
      <Spinner color="primary" />
      <Spinner color="secondary" />
      <Spinner color="success" />
      <Spinner color="warning" />
      <Spinner color="danger" />
    </div>
  ) : (
    children
  );
};

export default AuthProvider;
