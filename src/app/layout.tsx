import clsx from 'clsx';
import { Viewport } from 'next';
import { Inter, Roboto } from 'next/font/google';
import './globals.css';
import TanStackProvider from '@/configs/providers/TanStackProvider';
// const inter = Inter({ subsets: ['vietnamese'] });
const roboto = Roboto({ subsets: ['vietnamese'], weight: ['400'] });
import NextUiProvider from '../configs/providers/NextUiProvider';

const inter = Inter({ subsets: ['vietnamese'] });

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <NextUiProvider themeProps={{ attribute: 'class', defaultTheme: 'dark', children }}>
          <TanStackProvider>{children}</TanStackProvider>
        </NextUiProvider>
      </body>
    </html>
  );
}
