import { transactions } from '@/data';
import { formatCurrency, formatTimeToSeconds } from '@/util';
import { Chip, ChipProps } from '@nextui-org/react';
import { useCallback } from 'react';

export const INITIAL_VISIBLE_COLUMNS = [
  'orderId',
  'shopName',
  'customerName',
  'status',
  'orderDate',
  'price',
];

export const statusColorMap: Record<string, ChipProps['color']> = {
  'Đã hoàn thành': 'success',
  'Đang thực hiện': 'warning',
  'Đã hủy': 'danger',
};

export type Transactions = (typeof transactions)[0];

export default function RenderCell() {
  return useCallback((transaction: Transactions, columnKey: React.Key) => {
    const cellValue = transaction[columnKey as keyof Transactions];

    switch (columnKey) {
      case 'shopName':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{transaction.shopName}</p>
          </div>
        );
      case 'customerName':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{transaction.customerName}</p>
          </div>
        );
      case 'orderDate':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{formatTimeToSeconds(transaction.orderDate)}</p>
          </div>
        );
      case 'price':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{formatCurrency(transaction.price)}</p>
          </div>
        );
      case 'orderDate':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{transaction.orderDate}</p>
          </div>
        );
      case 'orderId':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{transaction.orderId}</p>
          </div>
        );
      case 'status':
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[transaction.status]}
            size="sm"
            variant="flat"
          >
            {transaction.status}
          </Chip>
        );
      default:
        return cellValue;
    }
  }, []);
}
