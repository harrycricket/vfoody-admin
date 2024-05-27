import type { Metadata } from 'next';
import { Inter, Roboto } from 'next/font/google';
import './globals.css';

// const inter = Inter({ subsets: ['vietnamese'] });
const roboto = Roboto({ subsets: ['vietnamese'], weight: ['400'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
