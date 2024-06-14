'use client';
import { columns, rows, status, transactions } from '@/data';
import { capitalize, formatDate, formatNumberVND } from '@/util';
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Chip,
  ChipProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Selection,
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import Link from 'next/link';
import React, { useCallback, useMemo, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { CiSearch } from 'react-icons/ci';
import { IoChevronDown } from 'react-icons/io5';

const statusColorMap: Record<string, ChipProps['color']> = {
  'Đã hoàn thành': 'success',
  'Đang thực hiện': 'secondary',
  'Đã hủy': 'danger',
};

const INITIAL_VISIBLE_COLUMNS = [
  'orderId',
  'shopName',
  'customerName',
  'status',
  'orderDate',
  'price',
  // 'actions',
];

type Transactions = (typeof transactions)[0];

export default function Transactions() {
  const [filterValue, setFilterValue] = useState('');
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = useState<Selection>('all');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'age',
    direction: 'ascending',
  });

  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredTransactions = [...transactions];

    if (hasSearchFilter) {
      filteredTransactions = filteredTransactions.filter((transaction) =>
        transaction.shopName.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== 'all' && Array.from(statusFilter).length !== status.length) {
      filteredTransactions = filteredTransactions.filter((transaction) =>
        Array.from(statusFilter).includes(transaction.status),
      );
    }

    return filteredTransactions;
  }, [transactions, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: Transactions, b: Transactions) => {
      const first = a[sortDescriptor.column as keyof Transactions] as number;
      const second = b[sortDescriptor.column as keyof Transactions] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((transaction: Transactions, columnKey: React.Key) => {
    const cellValue = transaction[columnKey as keyof Transactions];

    switch (columnKey) {
      // case 'name':
      //   return (
      //     <User
      //       avatarProps={{ radius: 'lg', src: transaction.avatar }}
      //       description={transaction.email}
      //       name={cellValue}
      //     >
      //       {transaction.email}
      //     </User>
      //   );
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
            <p className="text-bold text-small capitalize">{formatDate(transaction.orderDate)}</p>
          </div>
        );
      case 'price':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{formatNumberVND(transaction.price)}</p>
          </div>
        );
      case 'orderDate':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{transaction.orderDate}</p>
          </div>
        );
      case 'orderId':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{transaction.orderId}</p>
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
      // case 'actions':
      //   return (
      //     <div className="relative flex justify-end items-center gap-2">
      //       <Dropdown>
      //         <DropdownTrigger>
      //           <Button isIconOnly size="sm" variant="light">
      //             <BsThreeDotsVertical className="text-default-300" />
      //           </Button>
      //         </DropdownTrigger>
      //         <DropdownMenu>
      //           <DropdownItem>View</DropdownItem>
      //           <DropdownItem>Edit</DropdownItem>
      //           <DropdownItem>Delete</DropdownItem>
      //         </DropdownMenu>
      //       </Dropdown>
      //     </div>
      //   );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue('');
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <>
          <Breadcrumbs size="lg">
            <BreadcrumbItem>
              <Link href={'dashboard'}>Thống kê tổng quan</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>Quản lý giao dịch</BreadcrumbItem>
          </Breadcrumbs>
        </>
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Tìm kiếm theo tên cửa hàng..."
            startContent={<CiSearch />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<IoChevronDown className="text-small" />} variant="flat">
                  Trạng thái
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {status.map((item) => (
                  <DropdownItem key={item.uid} className="capitalize">
                    {capitalize(item.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<IoChevronDown className="text-small" />} variant="flat">
                  Tên cột
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Tổng cộng {transactions.length} giao dịch
          </span>
          <label className="flex items-center text-default-400 text-small">
            Số dòng mỗi trang:
            <select className="bg-transparent text-base" onChange={onRowsPerPageChange}>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    transactions.length,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400"></span>
        <Pagination
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={page === 1} size="sm" onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={page === pages} size="sm" onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      selectedKeys={selectedKeys}
      selectionMode="single"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
            allowsSorting={column.sortable}
            className="text-center"
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={'No transactions found'} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id} className="text-center">
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
