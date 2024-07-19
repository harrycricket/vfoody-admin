import TestModel from '@/types/models/TestModel';
import apiClient from './api-client';
import createHttpService from './api-service';
import PromotionModel from '@/types/models/PromotionModel';
import CommissionModel from '@/types/models/CommissionModel';

export const endpoints = {
  TEST: 'https://my-json-server.typicode.com/duckodei/test-json-server/list/',
  PROMOTION: 'admin/promotion',
  PROMOTION_IMAGE_UPLOAD: 'admin/promotion/upload',
  WITHDRAW_GET: 'admin/shop/withdrawal/request',
  WITHDRAW_APPROVE: 'admin/shop/withdrawal/approve',
  WITHDRAW_REJECT: 'admin/shop/withdrawal/reject',
  COMMISSION: 'admin/commission',
};

export const testApiService = createHttpService<TestModel>(apiClient, endpoints.TEST);
export const promotionApiService = createHttpService<PromotionModel>(
  apiClient,
  endpoints.PROMOTION,
);
export const commissionApiService = createHttpService<CommissionModel>(
  apiClient,
  endpoints.COMMISSION,
);
