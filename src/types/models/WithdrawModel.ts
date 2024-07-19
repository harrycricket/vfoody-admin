import { formatDateStringYYYYMMDD_HHMM } from '@/services/util-services/TimeFormatService';

export enum WithdrawStatus {
  Pending = 1,
  Approved = 2,
  Rejected = 3,
}

export default interface WithdrawModel {
  id: number;
  shopId: number;
  shopName: string;
  logoUrl: string;
  bannerUrl: string;
  balance: number;
  email: string;
  requestId: number;
  requestedAmount: number;
  status: number;
  bankCode: number;
  bankShortName: string;
  bankAccountNumber: string;
  note: string | null;
  requestedDate: string;
  processedDate: string;
}

export const withdrawTableColumns = [
  { name: 'Mã yêu cầu', uid: 'requestId', sortable: true },
  { name: 'Tên tiệm', uid: 'shopName', sortable: true },
  { name: 'Logo', uid: 'logoUrl', imageable: true },
  { name: 'Banner', uid: 'bannerUrl', imageable: true },
  { name: 'Số dư', uid: 'balance', sortable: true },
  { name: 'Email', uid: 'email', sortable: true },
  { name: 'Số tiền yêu cầu', uid: 'requestedAmount', sortable: true },
  { name: 'Ngân hàng', uid: 'bankShortName', sortable: true },
  { name: 'Số tài khoản', uid: 'bankAccountNumber', sortable: true },
  { name: 'Ngày yêu cầu', uid: 'requestedDate', sortable: true },
  { name: 'Ngày xử lý', uid: 'processedDate', sortable: true },
  { name: 'Ghi chú', uid: 'note' },
  { name: 'Trạng thái', uid: 'status', sortable: true },
  { name: 'Thao tác', uid: 'actions' },
];

export const withdrawStatuses = [
  { label: 'Đang chờ', key: 1 },
  { label: 'Đã xử lý', key: 2 },
  { label: 'Bị từ chối', key: 3 },
];

export const initWithdrawSampleObject = {
  shopId: 35,
  shopName: 'Tiệm cơm nhà Ngân',
  logoUrl:
    'https://v-foody.s3.ap-southeast-1.amazonaws.com/image/1721309286995-f5a130a5-3903-4f62-a00e-e396a4311a69',
  bannerUrl:
    'https://v-foody.s3.ap-southeast-1.amazonaws.com/image/1721309863790-2b792e29-279b-4e47-8d15-326287f484d4',
  balance: 326000,
  email: 'nganthinguyen0033@gmail.com',
  requestId: 3,
  requestedAmount: 10000,
  status: WithdrawStatus.Pending,
  bankCode: 43,
  bankShortName: 'Vietcombank',
  bankAccountNumber: '2132131231',
  note: null,
  requestedDate: formatDateStringYYYYMMDD_HHMM('2024-07-18T14:42:28'),
  processedDate: formatDateStringYYYYMMDD_HHMM('0001-01-01T00:00:00'),
} as WithdrawModel;
