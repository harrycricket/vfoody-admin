'use client';
import React from 'react';
import TestLayout from './layout';
import useFetchGeneric from '@/hooks/fetching/useFetchGeneric';
import apiClient from '@/services/api-services/api-client';
import { testApiService } from '@/services/api-services/api-service-instances';
import TestModel from '@/types/models/TestModel';
import Link from 'next/link';
import PagingRequestQuery from '@/types/queries/PagingRequestQuery';

const Page: React.FC = () => {
  const { models, pageable, isLoading, error } = useFetchGeneric<TestModel, PagingRequestQuery>(
    testApiService,
    {} as PagingRequestQuery,
  );
  console.log(models);
  return (
    <TestLayout>
      <h1>Page 1</h1>
      <nav>
        <Link href="/test/page1">Page 1</Link>
        <Link href="/test/page2">Page 2</Link>
      </nav>
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
