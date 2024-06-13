'use client';
import React from 'react';
import { testApiService } from '@/services/api-services/api-service-instances';
import TestModel from '@/types/models/TestModel';
import useFetchWithReactQuery from '@/hooks/fetching/useFetchWithRQ';
import PagingRequestQuery from '@/types/queries/PagingRequestQuery';
import REACT_QUERY_CACHE_KEYS from '@/data/constants/react-query-cache-keys';

const PageWithRQ: React.FC = () => {
  const fetch = useFetchWithReactQuery<TestModel, PagingRequestQuery>(
    REACT_QUERY_CACHE_KEYS.TEST,
    testApiService,
    {} as PagingRequestQuery,
  );
  console.log(fetch);
  const { data, isLoading, error } = fetch;
  console.log(data);
  return (
    <>
      <h1>Page RQ</h1>
      <ul>
        {data?.value?.items?.map((model) => (
          <li key={model.id}>
            <h2>{model.name}</h2>
            <p>{model.description}</p>
            <hr></hr>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PageWithRQ;
