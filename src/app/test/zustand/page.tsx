'use client';
import React from 'react';
import TestLayout from '../layout';
import useFetchGeneric from '@/hooks/fetching/useFetchGeneric';
import apiClient from '@/services/api-services/api-client';
import { testApiService } from '@/services/api-services/api-service-instances';
import TestModel from '@/types/models/TestModel';
import useFetchWithReactQuery from '@/hooks/fetching/useFetchWithReactQuery';
import PagingRequestQuery from '@/types/queries/PagingRequestQuery';
import REACT_QUERY_CACHE_KEYS from '@/data/constants/react-query-cache-keys';
import useCounterState from '@/hooks/states/useCounterState';

const Page: React.FC = () => {
  const { counter, increment, reset } = useCounterState();
  // const counter = useCounterState((state) => state.counter); // counter is changed => re-render, max is changed => not

  return (
    <div>
      Counter ({counter})
      <button onClick={() => increment()} className="btn btn-primary mx-1">
        Increment
      </button>
      <button onClick={() => reset()} className="btn btn-primary mx-1">
        Reset
      </button>
    </div>
  );
};

export default Page;
