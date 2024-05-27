import { Button } from '@nextui-org/button';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Button>VFoody </Button>
        <h1 className="text-4xl font-bold text-center mt-8">Welcome to VFoody</h1>
      </div>
    </main>
  );
}
