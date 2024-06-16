'use client';
import DashboardTimeFilter from '@/components/dashboard/DashboardTimeFilter';
import AdminLayout from '@/components/layouts/AdminLayout';
import { shopColumns, shops, shopStatus } from '@/data';
import { formatDate, formatCurrency, formatPhoneNumber } from '@/util';
import {
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
  User,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { CiSearch } from 'react-icons/ci';
import { IoChevronDown } from 'react-icons/io5';

const statusColorMap: Record<string, ChipProps['color']> = {
  'Đang hoạt động': 'success',
  'Đang đóng cửa': 'warning',
  'Đã bị cấm': 'danger',
};

const INITIAL_VISIBLE_COLUMNS = [
  'shopName',
  'shopOwnerName',
  'revenue',
  'status',
  'registerDate',
  'actions',
];

type Shops = (typeof shops)[0];

export default function Shops() {
  const [filterValue, setFilterValue] = useState('');
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = useState<Selection>('all');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'age',
    direction: 'ascending',
  });
  const router = useRouter();

  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return shopColumns;

    return shopColumns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredShops = [...shops];

    if (hasSearchFilter) {
      filteredShops = filteredShops.filter((shop) =>
        shop.shopName.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== 'all' && Array.from(statusFilter).length !== status.length) {
      filteredShops = filteredShops.filter((shop) =>
        Array.from(statusFilter).includes(shop.status),
      );
    }

    return filteredShops;
  }, [shops, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: Shops, b: Shops) => {
      const first = a[sortDescriptor.column as keyof Shops] as number;
      const second = b[sortDescriptor.column as keyof Shops] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((shop: Shops, columnKey: React.Key) => {
    const cellValue = shop[columnKey as keyof Shops];

    switch (columnKey) {
      case 'shopName':
        return (
          <User
            avatarProps={{ radius: 'full', src: shop.logoUrl }}
            name={shop.shopName}
            className="flex justify-start font-semibold"
          >
            {shop.shopName}
          </User>
        );
      case 'shopOwnerName':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{shop.shopOwnerName}</p>
          </div>
        );
      case 'totalOrder':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small ">{shop.totalOrder}</p>
          </div>
        );
      case 'totalProduct':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small ">{shop.totalProduct}</p>
          </div>
        );
      case 'registerDate':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small ">{formatDate(shop.registerDate)}</p>
          </div>
        );
      case 'phoneNumber':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small ">{formatPhoneNumber(shop.phoneNumber)}</p>
          </div>
        );
      case 'revenue':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{formatCurrency(shop.revenue)}</p>
          </div>
        );
      case 'shopId':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{shop.shopId}</p>
          </div>
        );
      case 'status':
        return (
          <Chip className="capitalize" color={statusColorMap[shop.status]} size="sm" variant="flat">
            {shop.status}
          </Chip>
        );
      case 'actions':
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="md" variant="light">
                  <BsThreeDotsVertical className="text-black" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>Xem chi tiết</DropdownItem>
                {shop.status === 'Đã bị cấm' ? (
                  <DropdownItem>Bỏ cấm</DropdownItem>
                ) : (
                  <DropdownItem>Cấm</DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>
        );
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
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[80%]"
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
                {shopStatus.map((item) => (
                  <DropdownItem key={item.uid} className="capitalize">
                    {item.name}
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
                {shopColumns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {column.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Tổng cộng {shops.length} cửa hàng</span>
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
    shops.length,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="p-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === 'all'
            ? 'Đã chọn tất cả'
            : `Đã chọn ${selectedKeys.size}/${filteredItems.length}`}
        </span>
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
    <AdminLayout activeContentIndex={2}>
      <div className="px-4 py-2">
        <h1 className="text-3xl font-bold text-primary">Quản lý cửa hàng</h1>
        <div className="flex items-center justify-end mb-4">
          <DashboardTimeFilter />
        </div>
        <Table
          isHeaderSticky
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          selectedKeys={selectedKeys}
          selectionMode="multiple"
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
          <TableBody emptyContent={'No shops found'} items={sortedItems}>
            {(item) => (
              <TableRow
                key={item.id}
                className="text-center cursor-pointer"
                // onClick={() => router.push('/shops/order-details')}
              >
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
}
