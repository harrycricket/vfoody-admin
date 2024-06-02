'use client';
import React from 'react';
import TestLayout from '../layout';
import useFetchGeneric from '@/hooks/fetching/useFetchGeneric';
import apiClient from '@/services/api-services/api-client';
import { testApiService } from '@/services/api-services/api-service-instances';
import TestModel from '@/types/models/TestModel';
import useFetchWithReactQuery from '@/hooks/fetching/useFetchWithReactQuery';
import PagingRequestQuery from '@/types/queries/PagingRequestQuery';

const PageWithRQ: React.FC = () => {
  const { data, isLoading, error } = useFetchWithReactQuery<TestModel, PagingRequestQuery>(
    'list',
    testApiService,
    {} as PagingRequestQuery,
  );
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
