'use client';
import apiClient from '@/services/api-services/api-client';
import { Button, Card, CardBody, CardFooter, CardHeader, Image, Input } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (email.length == 0 && password.length == 0) {
      setError('Vui lòng nhập email và mật khẩu');
      return;
    }
    if (email.length == 0) {
      setError('Vui lòng nhập email');
      return;
    }

    if (password.length == 0) {
      setError('Vui lòng nhập mật khẩu');
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

    const payload = {
      email,
      password,
    };

    const responseData = await apiClient.post('customer/login', payload);
    console.log(payload);

    if (responseData.data.isFailure) {
      setError('Email hoặc mật khẩu không đúng');
      return;
    }

    if (responseData.data.value.accountResponse.roleName !== 'Admin') {
      setError('Bạn không có quyền truy cập');
      return;
    }
    localStorage.setItem('token', responseData.data.value.accessTokenResponse.accessToken);
    console.log(responseData.data.value.accessTokenResponse.accessToken, 'accessToken');
    router.push('/dashboard');
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Card className="w-[400px] p-4">
        <CardHeader className="flex gap-3 justify-center items-center">
          <div style={{ marginLeft: '-12px' }}>
            <Image alt="VFoody Logo" height={32} radius="sm" src="./images/logo.png" width={32} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-medium">VFOODY</h1>
          </div>
        </CardHeader>
        <CardBody className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="email"
            label="Email"
            placeholder="Vui lòng nhập email"
            errorMessage="Email không hợp lệ"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
          />
          <Input
            type="password"
            label="Mật khẩu"
            placeholder="Vui lòng nhập mật khẩu"
            minLength={6}
            errorMessage="Mật khẩu phải có ít nhất 6 ký tự"
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
            Đăng nhập
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
