'use client';
import { useRouter } from 'next/navigation';
import { ThemeSwitch } from '@/components/theme-switch';
import { Button, Card, CardBody, CardFooter, CardHeader, Image, Input } from '@nextui-org/react';
import React, { useState } from 'react';
import authService from '@/services/auth-services/auth-service';
import apiClient from '@/services/api-services/api-client';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (email.length == 0 && password.length == 0) {
      setError('Please enter email & password');
      return;
    }
    if (email.length == 0) {
      setError('Please enter email');
      return;
    }

    if (password.length == 0) {
      setError('Please enter password');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('');
      return;
    }

    // Password length validation
    if (password.length < 6) {
      setError('');
      return;
    }

    fetch('https://localhost:7253/api/v1/customer/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: 'duyduc@vfoody.com', password: '123456' }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Login successful:', data);
        // Handle successful login here, e.g., redirect to dashboard
      })
      .catch((error) => {
        console.log('Error during login:', error);
        // Handle error here, e.g., show error message
      });

    // Check if email and password match the sample credentials
    if (await authService.login(email, password)) {
      // Redirect to dashboard if login is successful
    } else {
      // Show error message if login fails
      setError('Wrong email or password');
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <ThemeSwitch className="fixed right-6 bottom-6" />
      <Card className="w-[400px] p-4">
        <CardHeader className="flex gap-3 justify-center items-center">
          <Image
            alt="VFoody Logo"
            height={24}
            radius="sm"
            src="./images/vfoody-logo-bg-light-gray.png"
            width={24}
          />
          <div className="flex flex-col">
            <h1 className="text-2xl font-medium">VFOODY</h1>
          </div>
        </CardHeader>
        <CardBody className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            errorMessage="Please enter email format"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
          />
          <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
            minLength={6}
            errorMessage="Enter password at least 6 characters"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
          />
          {error && <p className="text-sm text-danger text-center">{error}</p>}
        </CardBody>
        <CardFooter>
          <Button
            radius="md"
            className="w-[400px] bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg mt-2"
            onClick={handleLogin}
          >
            Sign In
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
