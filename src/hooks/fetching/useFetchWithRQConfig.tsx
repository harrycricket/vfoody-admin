import FetchResponse from '@/types/responses/FetchResponse';
import { APIEntityModel, APIService } from '@/services/api-services/api-service';
import { useQuery } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { useEffect, useRef } from 'react';

const useFetchWithReactQueryConfig = <Model extends APIEntityModel>(
  keyBase: any[],
  apiService: APIService<Model>,
  requestConfig?: AxiosRequestConfig,
  deps?: any[],
) => {
  const isFirstRender = useRef(true);

  const fetchFunction = (): Promise<any> => {
    const { request, cancel } = apiService.getAll<FetchResponse<Model>>(requestConfig);
    return request.then((response) => response.data);
  };

  const query = useQuery<FetchResponse<Model>, Error>({
    queryKey: keyBase,
    queryFn: fetchFunction,
    // keepPreviousData: true,
  });

  useEffect(
    () => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
      } else {
        query.refetch();
      }
    },
    deps ? [...deps] : [],
  );
  return query;
};

export default useFetchWithReactQueryConfig;
