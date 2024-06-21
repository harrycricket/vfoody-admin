export default interface Shop {
  id: number;
  shopName: string;
  shopOwnerName: string;
  logoUrl: string;
  bannerUrl: string;
  description: string;
  balance: number;
  phoneNumber: string;
  activeFrom: number;
  activeTo: number;
  active: string;
  status: string;
  totalOrder: number;
  totalProduct: number;
  totalRating: number;
  totalStar: number;
  ratingPercent: number;
  minimumValueOrderFreeship: number;
  shippingFee: number;
  createdDate: string;
  building: {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
  };
}
