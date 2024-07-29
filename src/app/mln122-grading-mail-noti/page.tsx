'use client';
import { useEffect } from 'react';

const Page = () => {
  useEffect(() => {
    // Gửi request đến API
    fetch('https://vfoody-api.1wolfalone1.com/api/v1/send-mail-grade', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        window.location.href = '/login';
      })
      .catch((error) => {
        console.error('Error:', error);
        window.location.href = '/login';
      });
  }, []);

  return <div className="text-center">Sending mail...</div>;
};

export default Page;
