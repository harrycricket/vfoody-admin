import TestModel from '@/types/models/TestModel';
import apiClient from './api-client';
import createHttpService from './api-service';

const endpoints = {
  TEST: 'list',
};

export const testApiService = createHttpService<TestModel>(apiClient, endpoints.TEST);
