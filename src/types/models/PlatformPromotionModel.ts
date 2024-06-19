export enum PlatformPromotionType {
  RateApply = 1,
  AmountApply = 2,
}
export enum PlatformPromotionStatus {
  Active = 1,
  UnActive = 2,
  Deleted = 3,
}

export default interface PlatformPromotionModel {
  id: number;
  title: string;
  bannerUrl: string;
  amountRate: number;
  minimumOrderValue: number;
  maximumApplyValue: number;
  amountValue: number;
  applyType: number;
  status: number;
  startDate: Date;
  endDate: Date;
  usageLimit: number;
  numberOfUsed: number;
}
