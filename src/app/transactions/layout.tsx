import { ReactNode } from 'react';

export default function TransactionLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="px-12 py-4">
          <p className="text-3xl font-bold mb-8">Quản lý giao dịch</p>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
