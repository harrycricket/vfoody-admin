import { ThemeSwitch } from '@/components/theme-switch';
import { Button } from '@nextui-org/button';
import { Tooltip } from '@nextui-org/react';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Button color="primary">VFoody</Button>
        <Tooltip content="Harry is coming" showArrow={true}>
          <Button color="danger">Hover</Button>
        </Tooltip>
        <Image src="/images/logo.png" alt="Logo" width={120} height={150} />
        <h1 className="text-4xl font-thin text-center mt-8">Welcome to VFoody</h1>
        <ThemeSwitch />
      </div>
    </main>
  );
}
