import TestModel from '@/types/models/TestModel';
import apiClient from './api-client';
import createHttpService from './api-service';
import PlatformPromotionModel from '@/types/models/PlatformPromotionModel';

const endpoints = {
  TEST: 'https://my-json-server.typicode.com/duckodei/test-json-server/list/',
  PLATFORM_PROMOTION: 'admin/promotion',
};

export const testApiService = createHttpService<TestModel>(apiClient, endpoints.TEST);
export const platfromPromotionApiService = createHttpService<PlatformPromotionModel>(
  apiClient,
  endpoints.PLATFORM_PROMOTION,
);
