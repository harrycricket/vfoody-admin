'use client';
import DashboardTimeFilter from '@/components/dashboard/DashboardTimeFilter';
import AdminLayout from '@/components/layouts/AdminLayout';
import { accountColumns, accounts, accountStatus, accountType } from '@/data';
import { formatDate, formatPhoneNumber } from '@/util';
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
  'Đã bị cấm': 'danger',
};

const INITIAL_VISIBLE_COLUMNS = ['accountName', 'status', 'accountType', 'registerDate', 'actions'];

type Accounts = (typeof accounts)[0];

export default function Accounts() {
  const [filterValue, setFilterValue] = useState('');
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = useState<Selection>('all');
  const [typeFilter, setTypeFilter] = useState<Selection>('all');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'age',
    direction: 'ascending',
  });
  const router = useRouter();

  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return accountColumns;

    return accountColumns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredAccounts = [...accounts];

    if (hasSearchFilter) {
      filteredAccounts = filteredAccounts.filter((account) =>
        account.accountName.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    if (statusFilter !== 'all' && Array.from(statusFilter).length !== status.length) {
      filteredAccounts = filteredAccounts.filter((account) =>
        Array.from(statusFilter).includes(account.status),
      );
    }

    if (typeFilter !== 'all' && Array.from(typeFilter).length !== accountType.length) {
      filteredAccounts = filteredAccounts.filter((account) =>
        Array.from(typeFilter).includes(account.accountType),
      );
    }

    return filteredAccounts;
  }, [accounts, filterValue, statusFilter, typeFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: Accounts, b: Accounts) => {
      const first = a[sortDescriptor.column as keyof Accounts] as number;
      const second = b[sortDescriptor.column as keyof Accounts] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((account: Accounts, columnKey: React.Key) => {
    const cellValue = account[columnKey as keyof Accounts];

    switch (columnKey) {
      case 'accountName':
        return (
          <User
            avatarProps={{ radius: 'full', src: account.avatarUrl }}
            name={account.accountName}
            className="flex justify-start font-semibold"
          >
            {account.accountName}
          </User>
        );
      case 'email':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{account.email}</p>
          </div>
        );
      case 'phoneNumber':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{formatPhoneNumber(account.phoneNumber)}</p>
          </div>
        );
      case 'registerDate':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{formatDate(account.registerDate)}</p>
          </div>
        );
      case 'accountId':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{account.accountId}</p>
          </div>
        );
      case 'accountType':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{account.accountType}</p>
          </div>
        );
      case 'status':
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[account.status]}
            size="sm"
            variant="flat"
          >
            {account.status}
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
                {account.status === 'Đã bị cấm' ? (
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
            placeholder="Tìm kiếm theo tên tải khoản..."
            startContent={<CiSearch />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<IoChevronDown className="text-small" />} variant="flat">
                  Loại tài khoản
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={typeFilter}
                selectionMode="multiple"
                onSelectionChange={setTypeFilter}
              >
                {accountType.map((item) => (
                  <DropdownItem key={item.uid} className="capitalize">
                    {item.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
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
                {accountStatus.map((item) => (
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
                {accountColumns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {column.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Tổng cộng {accounts.length} tài khoản</span>
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
    typeFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    accounts.length,
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
    <AdminLayout activeContentIndex={3}>
      <div className="px-4 py-2">
        <h1 className="text-3xl font-bold text-primary">Quản lý tài khoản</h1>
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
          <TableBody emptyContent={'No accounts found'} items={sortedItems}>
            {(item) => (
              <TableRow
                key={item.id}
                className="text-center cursor-pointer"
                // onClick={() => router.push('/accounts/order-details')}
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
