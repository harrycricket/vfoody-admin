import PagingRequestQuery from './PagingRequestQuery';
interface WithdrawQuery extends PagingRequestQuery {
  shopId?: number;
  shopName?: string;
  status?: number;
  dateFrom?: Date;
  dateTo?: Date;
  orderBy?: number;
  orderMode?: number;
}

export default WithdrawQuery;
