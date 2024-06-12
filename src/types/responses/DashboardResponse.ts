import APICommonResponse from './APICommonResponse';

export interface DashboardOverviewAPIReponse extends APICommonResponse {
  value: {
    totalTrading: number;
    totalTradingRate: number;
    totalRevenue: number;
    totalRevenueRate: number;
    totalOrder: number;
    totalOrderRate: number;
    totalUser: number;
    totalUserRate: number;
    dayCompareRate: number;
  };
}
