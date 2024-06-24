import PagingRequestQuery from './PagingRequestQuery';

export default interface PromotionQuery extends PagingRequestQuery {
  title: string;
  description: string;
  status: number;
  applyType: number;
  dateFrom: Date;
  dateTo: Date;
  promotionType: number;
}
