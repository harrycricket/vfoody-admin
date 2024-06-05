import clsx from 'clsx';
import { Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['vietnamese'] });

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={clsx('bg-background', inter.className)}>
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark', children }}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
