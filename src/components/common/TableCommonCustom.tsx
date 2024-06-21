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
  pagination,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoChevronDown } from 'react-icons/io5';
import DashboardTimeFilter from '@/components/dashboard/DashboardTimeFilter';
import PageableModel from '@/types/models/PageableModel';

export interface TableCustomFilter {
  label: string;
  mappingField: string;
  options: { key: number; desc: string }[];
  selectedValues: Set<number>;
  selectionMode: number; // 1: single others: multiple
  handleFunc: (values: Selection) => void; // Function to handle filter change
}

export type TableCustomProps = {
  indexPage: number;
  title: string;
  description: string;
  initColumns: string[];

  placeHolderSearch: string;
  searchHandler: (value: string) => void;

  arrayData: { [key: string]: any }[];
  arrayDataColumns: Array<{ name: string; uid: string; sortable?: boolean; imageable?: boolean }>;

  pagination: PageableModel;
  goToPage: (index: number) => void;
  setPageSize: (size: number) => void;

  filters?: TableCustomFilter[]; // New prop for array of filters

  renderCell: (item: any, columnKey: React.Key) => React.ReactNode;
  onReset: () => void;
};

export default function TableCommonCustom<T>({
  indexPage,
  title,
  description,
  initColumns,

  searchHandler,
  placeHolderSearch,

  arrayData,
  arrayDataColumns,

  pagination,
  goToPage,
  setPageSize,

  filters = [],

  renderCell,
  onReset,
}: TableCustomProps) {
  console.log(arrayData);
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(initColumns));
  const loadPreviousPage = () => {
    goToPage(page - 1);
    setPage(page - 1);
  };
  const loadNextPage = () => {
    goToPage(page + 1);
    setPage(page + 1);
  };

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return arrayDataColumns;
    return arrayDataColumns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns, arrayDataColumns]);

  const onRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setPage(1);
  }, []);

  const onClear = useCallback(() => {
    searchHandler('');
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
            value={searchText}
            onClear={() => {
              setSearchText('');
              searchHandler('');
            }}
            onValueChange={(value: string) => {
              setSearchText(value);
              searchHandler(value);
            }}
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
                  selectedKeys={filter.selectedValues}
                  selectionMode={filter.selectionMode == 1 ? 'single' : 'multiple'}
                  onSelectionChange={(selected) => {
                    console.log(
                      new Set<number>(
                        Array.from(selected).map((item) => parseInt(item.toString())),
                      ),
                    );
                    filter.handleFunc(selected);
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
          <span className="text-default-400 text-small">{description}</span>
          <label className="flex items-center text-default-400 text-small">
            Lượng dữ liệu / trang:
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
  }, [onClear, searchHandler, arrayData.length, pagination, filters]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400"></span>
        <Pagination
          showControls
          showShadow
          color="primary"
          page={page}
          total={pagination?.totalOfPages ?? 0}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={!pagination?.hasPrevious}
            size="sm"
            onPress={() => loadPreviousPage()}
          >
            Previous
          </Button>
          <Button isDisabled={!pagination?.hasNext} size="sm" onPress={() => loadNextPage()}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [page, pagination]);

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
          // sortDescriptor={sortDescriptor}
          topContent={topContent}
          topContentPlacement="outside"
          onSelectionChange={setSelectedKeys}
          // onSortChange={setSortDescriptor}
        >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === 'actions' ? 'center' : 'start'}
                // allowsSorting={column.sortable}
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
