import { AxiosInstance, AxiosRequestConfig } from 'axios';
import sessionService from '../session-service';

export interface APIModel {
  id: number | string;
}

export class APIService<T extends APIModel> {
  apiClient: AxiosInstance;
  endpoint: string;

  constructor(apiClient: AxiosInstance, endpoint: string) {
    this.apiClient = apiClient;
    this.endpoint = endpoint;
  }

  getAll<FetchResponse>(requestConfig?: AxiosRequestConfig) {
    let token = sessionService.getAuthToken();

    const controller = new AbortController();
    const request = this.apiClient.get<FetchResponse>(this.endpoint, {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      ...requestConfig,
    });
    return { request, cancel: () => controller.abort() };
  }

  get(id: number | string) {
    let token = sessionService.getAuthToken();

    return this.apiClient.get(this.endpoint + '/' + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  create(entity: T) {
    let token = sessionService.getAuthToken();

    return this.apiClient.post(this.endpoint, entity, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  update(entity: T) {
    let token = sessionService.getAuthToken();
    return this.apiClient.put(this.endpoint + '/' + entity.id, entity, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  delete(id: number | string) {
    let token = sessionService.getAuthToken();
    return this.apiClient.delete(this.endpoint + '/' + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

const createAPIService = <T extends APIModel>(apiClient: AxiosInstance, endpoint: string) =>
  new APIService<T>(apiClient, endpoint);

export default createAPIService;
