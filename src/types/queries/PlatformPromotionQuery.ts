import PagingRequestQuery from './PagingRequestQuery';

export default interface PlatformPromotionQuery extends PagingRequestQuery {
  title: string;
  description: string;
  status: number;
  applyType: number;
  dateFrom: Date;
  dateTo: Date;
}
