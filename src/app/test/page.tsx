'use client';
import React from 'react';
import TestLayout from './layout';
import useFetchGeneric from '@/hooks/fetching/useFetchGeneric';
import PagingRequestQuery from '@/types/queries/PagingRequestQuery';
import apiClient from '@/services/api-services/api-client';
import { testApiService } from '@/services/api-services/api-service-instances';
import TestModel from '@/types/models/TestModel';

const Page: React.FC = () => {
  const { models, pageable, isLoading, error } = useFetchGeneric<TestModel, PagingRequestQuery>(
    testApiService,
    {} as PagingRequestQuery,
  );
  return (
    <TestLayout>
      <h1>Page 1</h1>
      <ul>
        {models.map((model) => (
          <li key={model.id}>
            <h2>{model.name}</h2>
            <p>{model.description}</p>
            <hr></hr>
          </li>
        ))}
      </ul>
    </TestLayout>
  );
};

export default Page;
