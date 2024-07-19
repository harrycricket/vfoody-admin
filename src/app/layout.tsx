import TanStackProvider from '@/configs/providers/TanStackProvider';
import { Metadata, Viewport } from 'next';
import { Roboto } from 'next/font/google';
import NextUiProvider from '../configs/providers/NextUiProvider';
import './globals.css';
import AuthProvider from '@/configs/providers/AuthProvider';
const roboto = Roboto({ subsets: ['vietnamese'], weight: ['400', '500', '700', '900'] });

export const metadata: Metadata = {
  title: {
    default: 'VFoody',
    template: '%s - VFoody',
  },
  description: 'VFoody - The best food delivery service in Vinhomes.',
  icons: {
    icon: '/images/logo.png',
  },
};

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
        <NextUiProvider themeProps={{ attribute: 'class', defaultTheme: 'light', children }}>
          <TanStackProvider>
            <AuthProvider>{children}</AuthProvider>
          </TanStackProvider>
        </NextUiProvider>
      </body>
    </html>
  );
}
