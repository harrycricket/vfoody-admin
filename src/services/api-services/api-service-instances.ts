import TestModel from '@/types/models/TestModel';
import apiClient from './api-client';
import createHttpService from './api-service';
import PromotionModel from '@/types/models/PromotionModel';

export const endpoints = {
  TEST: 'https://my-json-server.typicode.com/duckodei/test-json-server/list/',
  PROMOTION: 'admin/promotion',
  PROMOTION_IMAGE_UPLOAD: 'admin/promotion/upload',
};

export const testApiService = createHttpService<TestModel>(apiClient, endpoints.TEST);
export const promotionApiService = createHttpService<PromotionModel>(
  apiClient,
  endpoints.PROMOTION,
);
