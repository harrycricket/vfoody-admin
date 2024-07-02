'use client';
import DashboardTimeFilter from '@/components/dashboard/DashboardTimeFilter';
import AdminLayout from '@/components/layouts/AdminLayout';
import {
  Button,
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
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoChevronDown } from 'react-icons/io5';

type TableCustomProps = {
  indexPage: number;
  title: string;
  initColumns: string[];
  placeHolderSearch: string;
  smallText: string;
  statusColorMap: Record<string, ChipProps['color']>;
  arrayData: any[];
  arrayDataColumns: object[];
  arrayDataStatus: object[];
  accountFilter?: boolean;
  accountType?: {
    uid: string;
    name: string;
  }[];
  renderCell: any;
  handleClick: (id: number) => void;
};

export default function TableCustom({
  indexPage,
  title,
  initColumns,
  placeHolderSearch,
  smallText,
  arrayData,
  arrayDataColumns,
  arrayDataStatus,
  accountFilter,
  accountType,
  renderCell,
  handleClick,
}: TableCustomProps) {
  type dataType = (typeof arrayData)[0];
  const [filterValue, setFilterValue] = useState('');
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(initColumns));
  const [statusFilter, setStatusFilter] = useState<Selection>('all');
  const [typeFilter, setTypeFilter] = useState<Selection>('all');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'age',
    direction: 'ascending',
  });
  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return arrayDataColumns;

    return arrayDataColumns.filter((column: any) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredData = [...arrayData];

    if (hasSearchFilter) {
      if (accountFilter) {
        filteredData = filteredData.filter((data) =>
          data.fullName.toLowerCase().includes(filterValue.toLowerCase()),
        );
      } else {
        filteredData = filteredData.filter((data) =>
          data.shopName.toLowerCase().includes(filterValue.toLowerCase()),
        );
      }
    }

    if (statusFilter !== 'all') {
      filteredData = filteredData.filter((data) => Array.from(statusFilter).includes(data.status));
    }

    if (
      accountFilter &&
      typeFilter !== 'all' &&
      Array.from(typeFilter).length !== accountType?.length
    ) {
      filteredData = filteredData.filter((account) =>
        Array.from(typeFilter).includes(account.roleName),
      );
    }

    return filteredData;
  }, [arrayData, filterValue, statusFilter, hasSearchFilter, typeFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: dataType, b: dataType) => {
      const first = a[sortDescriptor.column as keyof dataType] as number;
      const second = b[sortDescriptor.column as keyof dataType] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

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
            placeholder={placeHolderSearch}
            startContent={<CiSearch />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            {accountType && (
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
            )}

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
                {arrayDataStatus.map((item: any) => (
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
                {arrayDataColumns.map((column: any) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {column.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Tổng cộng {arrayData.length} {smallText}
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
    arrayData.length,
    typeFilter,
    hasSearchFilter,
    onClear,
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
            Trang trước
          </Button>
          <Button isDisabled={page === pages} size="sm" onPress={onNextPage}>
            Trang sau
          </Button>
        </div>
      </div>
    );
  }, [page, pages]);

  return (
    <AdminLayout activeContentIndex={indexPage}>
      <div className="px-4 py-2">
        <h1 className="text-3xl font-bold text-primary">{title}</h1>
        <div className="flex items-center justify-end mb-4">
          <DashboardTimeFilter />
        </div>
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
            {(column: any) => (
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
          <TableBody emptyContent={`Không có ${smallText} nào`} items={sortedItems}>
            {(item) => (
              <TableRow
                key={item.id}
                className="text-center cursor-pointer"
                onClick={() => handleClick(item.id)}
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
