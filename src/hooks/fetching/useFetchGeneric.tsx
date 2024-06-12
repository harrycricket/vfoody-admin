import useFetch from './useFetch';
import PagingRequestQuery from '@/types/queries/PagingRequestQuery';
import { APIEntityModel, APIService } from '@/services/api-services/api-service';

const useFetchGeneric = <Model extends APIEntityModel, Query extends PagingRequestQuery>(
  apiService: APIService<Model>,
  requestQuery: Query,
) => {
  const { models, pageable, error, isLoading, setModels, setError } = useFetch<Model>(
    apiService,
    {
      params: { ...requestQuery },
    },
    [requestQuery],
  );

  return {
    models,
    pageable,
    isLoading,
    error,
    setModels,
    setError,
  };
};

export default useFetchGeneric;
