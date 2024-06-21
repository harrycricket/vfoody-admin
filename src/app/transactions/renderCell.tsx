import Transaction from '@/types/transactions/Transaction';
import { formatCurrency, formatTimeToSeconds } from '@/util';
import { Chip, ChipProps } from '@nextui-org/react';
import { useCallback } from 'react';

export const INITIAL_VISIBLE_COLUMNS = [
  'id',
  'shopName',
  'customerName',
  'status',
  'orderDate',
  'price',
];

export const statusColorMap: Record<string, ChipProps['color']> = {
  'Đã hoàn thành': 'success',
  'Đang thực hiện': 'secondary',
  'Đã hủy': 'danger',
  'Giao không thành công': 'warning',
};

export default function RenderCell() {
  return useCallback((transaction: Transaction, columnKey: React.Key) => {
    const cellValue = transaction[columnKey as keyof Transaction];

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
      case 'orderId':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{transaction.id}</p>
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
