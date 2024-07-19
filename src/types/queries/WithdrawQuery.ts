import PagingRequestQuery from './PagingRequestQuery';
interface WithdrawQuery extends PagingRequestQuery {
  shopId?: string;
  shopName?: string;
  status?: number;
  dateFrom?: string;
  dateTo?: string;
  orderBy?: string;
  orderMode?: string;
}

export default WithdrawQuery;
