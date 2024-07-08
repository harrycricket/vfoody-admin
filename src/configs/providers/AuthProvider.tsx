'use client';
import { useRouter, usePathname } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token !== null;
  };

  if (!pathname.includes('login') && !isAuthenticated()) {
    router.push('/login');
  }

  return children;
};

export default AuthProvider;
