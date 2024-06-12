import FetchResponse from '@/types/responses/FetchResponse';
import { useQuery } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { useEffect, useRef } from 'react';

const useFetchWithRQConfigWithFetchFunction = <Response,>(
  keyBase: any[],
  fetchFunc: () => Promise<Response>,
  requestConfig?: AxiosRequestConfig,
  deps?: any[],
) => {
  const isFirstRender = useRef(true);

  const query = useQuery<Response, Error>({
    queryKey: keyBase,
    queryFn: fetchFunc,
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

export default useFetchWithRQConfigWithFetchFunction;
