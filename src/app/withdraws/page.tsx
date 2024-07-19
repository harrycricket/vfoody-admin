'use client';
import { NextPage } from 'next';
import TableCommonCustom, { TableCustomFilter } from '@/components/common/TableCommonCustom';
import { Avatar, Button, Selection, useDisclosure } from '@nextui-org/react';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import WithdrawModel, {
  WithdrawStatus,
  withdrawStatuses,
  withdrawTableColumns,
} from '@/types/models/WithdrawModel';
import { formatDateString } from '@/services/util-services/TimeFormatService';
import useFetchWithReactQuery from '@/hooks/fetching/useFetchWithRQ';
import WithdrawQuery from '@/types/queries/WithdrawQuery';
import REACT_QUERY_CACHE_KEYS from '@/data/constants/react-query-cache-keys';
import PageableModel from '@/types/models/PageableModel';
import numberFormatUtilService from '@/services/util-services/NumberFormatUtilService';
import WithdrawDetailModal from '@/components/withdraws/WithdrawDetailModal';
import APICommonResponse from '@/types/responses/APICommonResponse';
import Swal from 'sweetalert2';
import MutationResponse from '@/types/responses/MutationReponse';
import useFetchWithRQWithFetchFunc from '@/hooks/fetching/useFetchWithRQWithFetchFunc';
import FetchResponse from '@/types/responses/FetchResponse';
import { endpoints } from '@/services/api-services/api-service-instances';
import apiClient from '@/services/api-services/api-client';
import useWithdrawTargetState from '@/hooks/states/useWithdrawTargetState';
import sessionService from '@/services/session-service';
import usePeriodTimeFilterState from '@/hooks/states/usePeriodTimeFilterQuery';

const WithdrawPage: NextPage = () => {
  const { range, selected, setSelected, isSpecificTimeFilter } = usePeriodTimeFilterState();
  const { model: selectedWithdraw, setModel: setSelectedWithdraw } = useWithdrawTargetState();
  const [withdrawList, setWithdrawList] = useState<WithdrawModel[]>([]);
  const [statuses, setStatuses] = useState<Selection>(new Set(['0']));
  const [query, setQuery] = useState<WithdrawQuery>({
    pageIndex: 1,
    pageSize: 10,
    status: 0,
    dateFrom: range.dateFrom,
    dateTo: range.dateTo,
    shopId: 0,
    shopName: '',
    orderBy: 0,
    orderMode: 0,
  } as WithdrawQuery);

  const {
    isOpen: isDetailOpen,
    onOpen: onDetailOpen,
    onOpenChange: onDetailOpenChange,
    onClose: onDetailClose,
  } = useDisclosure();

  const {
    data: withdraws,
    isLoading,
    error,
    refetch,
  } = useFetchWithRQWithFetchFunc(
    REACT_QUERY_CACHE_KEYS.WITHDRAW,
    (): Promise<FetchResponse<WithdrawModel>> =>
      apiClient
        .get<FetchResponse<WithdrawModel>>(endpoints.WITHDRAW_GET, {
          headers: {
            Authorization: `Bearer ${sessionService.getAuthToken()}`,
          },
          params: { ...query },
        })
        .then((response) => response.data),
    [query],
  );

  useEffect(() => {
    if (withdraws)
      setWithdrawList(
        withdraws.value.items.map((item) => ({ ...item, id: item.requestId }) as WithdrawModel),
      );
  }, [withdraws]);

  useEffect(() => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      dateFrom: range.dateFrom,
      dateTo: range.dateTo,
    }));
  }, [range]);

  const statusFilterOptions = [{ key: 0, desc: 'Tất cả' }].concat(
    withdrawStatuses.map((item) => ({ key: item.key, desc: item.label })),
  );

  const statusFilter = {
    label: 'Trạng thái',
    mappingField: 'status',
    selectionMode: 1,
    options: statusFilterOptions,
    selectedValues: statuses,
    handleFunc: (values: Selection) => {
      let value = Array.from(values).map((val) => parseInt(val.toString()))[0];
      setStatuses(values);
      setQuery({ ...query, status: value });
    },
  } as TableCustomFilter;

  const handleRowClick = (id: number) => {
    let withdraw = withdraws?.value?.items?.find((item) => item.requestId === id);
    if (withdraw) {
      setSelectedWithdraw(withdraw);
      onDetailOpen();
    } else {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Không tìm thấy yêu cầu #' + numberFormatUtilService.hashId(id),
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleRowClickByModel = (model: WithdrawModel) => {
    setSelectedWithdraw(model);
    onDetailOpen();
  };

  const renderCell = useCallback((withdraw: WithdrawModel, columnKey: React.Key): ReactNode => {
    const cellValue = withdraw[columnKey as keyof WithdrawModel];

    switch (columnKey) {
      case 'requestId':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">
              {numberFormatUtilService.hashId(withdraw.requestId)}
            </p>
          </div>
        );
      case 'logoUrl':
        return (
          <div className="flex flex-col">
            <Avatar src={withdraw.logoUrl} />
          </div>
        );
      case 'shopName':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{withdraw.shopName}</p>
          </div>
        );
      case 'dateRequested':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{formatDateString(withdraw.requestedDate)}</p>
          </div>
        );
      case 'requestedAmount':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">
              {numberFormatUtilService.formatNumberWithDotEach3digits(withdraw.requestedAmount) +
                ' đ'}
            </p>
          </div>
        );
      case 'status':
        return (
          <div className="flex flex-col">
            <span
              className={
                withdraw.status === WithdrawStatus.Approved
                  ? 'w-fit bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300'
                  : withdraw.status === WithdrawStatus.Rejected
                    ? 'w-fit bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-700 dark:text-pink-300'
                    : 'w-fit bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300'
              }
            >
              {withdrawStatuses.find((item) => item.key === withdraw.status)?.label}
            </span>
          </div>
        );
      case 'actions':
        return (
          <Button
            size="sm"
            color="secondary"
            variant="ghost"
            onClick={() => handleRowClickByModel(withdraw)}
          >
            Chi tiết
          </Button>
        );
      default:
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{cellValue && cellValue.toString()}</p>
          </div>
        );
    }
  }, []);

  const handleApprove = async (withdraw: WithdrawModel) => {
    await Swal.fire({
      title: 'Phê duyệt yêu cầu #' + numberFormatUtilService.hashId(withdraw.requestId),
      input: 'textarea',
      inputLabel: 'Ghi chú',
      inputPlaceholder: 'Nhập ghi chú tại đây...',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Bạn cần nhập ghi chú!';
        }
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        await apiClient
          .put<APICommonResponse>(`admin/shop/${withdraw.shopId}/withdrawal/approve`, {
            shopId: withdraw.shopId,
            requestId: withdraw.requestId,
            note: result.value,
          })
          .then(async (response) => {
            if (response.data.isSuccess) {
              await Swal.fire('Thành công!', 'Yêu cầu đã được phê duyệt.', 'success');
              // onDetailOpen();
              setSelectedWithdraw({
                ...selectedWithdraw,
                status: WithdrawStatus.Approved,
                note: result.value,
              });
              refetch();
              onDetailOpen();
            } else {
              await Swal.fire('Thất bại!', 'Đã xảy ra lỗi khi phê duyệt yêu cầu.', 'error');
              onDetailOpen();
            }
          })
          .catch(async (error) => {
            await Swal.fire('Thất bại!', 'Đã xảy ra lỗi khi phê duyệt yêu cầu.', 'error');
            onDetailOpen();
          });
      } else {
      }
      onDetailOpen();
    });
  };

  const handleReject = async (withdraw: WithdrawModel) => {
    onDetailOpen();
    const { value: reason } = await Swal.fire({
      title: 'Từ chối yêu cầu #' + numberFormatUtilService.hashId(withdraw.requestId),
      input: 'textarea',
      inputLabel: 'Lý do',
      inputPlaceholder: 'Nhập lý do tại đây...',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Bạn cần nhập lý do!';
        }
      },
    });

    if (reason) {
      await apiClient
        .put<APICommonResponse>(`admin/shop/${withdraw.shopId}/withdrawal/reject`, {
          shopId: withdraw.shopId,
          requestId: withdraw.requestId,
          reason,
        })
        .then(async (response) => {
          if (response.data.isSuccess) {
            await Swal.fire('Thành công!', 'Yêu cầu rút tiền đã được từ chối.', 'success');
            setSelectedWithdraw({
              ...selectedWithdraw,
              status: WithdrawStatus.Rejected,
              note: reason || '',
            });
            onDetailOpen();
            refetch();
          } else {
            await Swal.fire('Thất bại!', 'Đã xảy ra lỗi khi từ chối yêu cầu.', 'error');
            onDetailOpen();
          }
        })
        .catch(async (error) => {
          await Swal.fire('Thất bại!', 'Đã xảy ra lỗi khi từ chối yêu cầu.', 'error');
          onDetailOpen();
        });
    }
    onDetailOpen();
  };

  return (
    <div style={{ position: 'relative' }}>
      <TableCommonCustom
        indexPage={5}
        title="Yêu cầu rút tiền"
        description="Danh sách các yêu cầu rút tiền của cửa hàng"
        initColumns={[
          'requestId',
          'logoUrl',
          'shopName',
          'dateRequested',
          'requestedAmount',
          'amount',
          'note',
          'status',
          'actions',
        ]}
        searchHandler={(value: string) => {
          setQuery({ ...query, shopName: value });
        }}
        placeHolderSearch="Tìm kiếm yêu cầu từ cửa hàng..."
        arrayData={withdrawList}
        arrayDataColumns={withdrawTableColumns}
        pagination={withdraws?.value as PageableModel}
        goToPage={(index: number) => setQuery({ ...query, pageIndex: index })}
        setPageSize={(size: number) => setQuery({ ...query, pageSize: size })}
        filters={[statusFilter]}
        renderCell={renderCell}
        onReset={() => setQuery({} as WithdrawQuery)}
        handleRowClick={handleRowClick}
        leftHeaderNode={<div />}
      />
      <WithdrawDetailModal
        isOpen={isDetailOpen}
        onOpen={onDetailOpen}
        onOpenChange={onDetailOpenChange}
        onClose={onDetailClose}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
};

export default WithdrawPage;
