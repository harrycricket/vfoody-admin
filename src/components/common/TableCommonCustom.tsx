// components/common/TableCustom.tsx
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
import DashboardTimeFilter from '@/components/dashboard/DashboardTimeFilter';

export interface TableCustomFilter {
  label: string;
  mappingField: string;
  options: { key: number; desc: string }[];
  selectedValue: number;
  handleFunc: (value: number) => void; // Function to handle filter change
}

export type TableCustomProps = {
  indexPage: number;
  title: string;
  initColumns: string[];
  placeHolderSearch: string;
  dataName: string;
  arrayData: { [key: string]: any }[];
  arrayDataColumns: Array<{ name: string; uid: string; sortable?: boolean; imageable?: boolean }>;
  searchFields?: string[];
  filters?: TableCustomFilter[]; // New prop for array of filters
  renderCell: (item: any, columnKey: React.Key) => React.ReactNode;
};

export default function TableCommonCustom<T>({
  indexPage,
  title,
  initColumns,
  placeHolderSearch,
  dataName,
  arrayData,
  arrayDataColumns,
  searchFields,
  filters = [],
  renderCell,
}: TableCustomProps) {
  console.log(arrayData);
  type dataType = (typeof arrayData)[0];
  const [filterValue, setFilterValue] = useState('');
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(initColumns));
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'id',
    direction: 'ascending',
  });
  const [page, setPage] = useState(1);
  const router = useRouter();

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return arrayDataColumns;
    return arrayDataColumns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns, arrayDataColumns]);

  const filteredItems = useMemo(() => {
    let filteredData = [...arrayData];

    if (hasSearchFilter && searchFields?.length) {
      filteredData = filteredData.filter((data) =>
        searchFields.some((field) =>
          data[field]?.toString().toLowerCase().includes(filterValue.toLowerCase()),
        ),
      );
    }

    filters.forEach((filter) => {
      const selectedValue = filter.selectedValue;
      filteredData = filteredData.filter((data) => data[filter.mappingField] === selectedValue);
    });

    return filteredData;
  }, [arrayData, filterValue, searchFields, filters]);

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
            onClear={onClear}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            {filters.map((filter, index) => (
              <Dropdown key={index}>
                <DropdownTrigger className="hidden sm:flex">
                  <Button endContent={<IoChevronDown className="text-small" />} variant="flat">
                    {filter.label}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Filter Options"
                  closeOnSelect={false}
                  selectedKeys={
                    new Set(
                      filter.options
                        .filter((opt) => opt.key === filter.selectedValue)
                        .map((opt) => opt.key),
                    )
                  }
                  selectionMode="single"
                  onSelectionChange={(selected) => {
                    const selectedValue = Array.from(selected).map((val) =>
                      parseInt(val.toString()),
                    )[0];
                    filter.handleFunc(selectedValue);
                  }}
                >
                  {filter.options.map((option) => (
                    <DropdownItem key={option.key} className="capitalize">
                      {option.desc}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Tổng {arrayData.length} {dataName}
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
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
    onClear,
    onRowsPerPageChange,
    onSearchChange,
    arrayData.length,
    filters,
    placeHolderSearch,
    dataName,
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
  }, [page, pages, onPreviousPage, onNextPage]);

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
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === 'actions' ? 'center' : 'start'}
                allowsSorting={column.sortable}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent="No data found" items={arrayData}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
}
