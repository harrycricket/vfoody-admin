import FetchResponse from '@/types/responses/FetchResponse';
import { APIModel, APIService } from '@/services/api-services/api-service';
import { useQuery } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';

const useFetchWithReactQueryConfig = <Model extends APIModel>(
  keyBase: string,
  apiService: APIService<Model>,
  requestConfig?: AxiosRequestConfig,
) => {
  const fetchFunction = async (): Promise<any> => {
    const { request, cancel } = apiService.getAll<FetchResponse<Model>>(requestConfig);
    return request.then((response) => response.data);
  };

  return useQuery<FetchResponse<Model>, Error>({
    queryKey: [keyBase, requestConfig],
    queryFn: fetchFunction,
  });
};

export default useFetchWithReactQueryConfig;
