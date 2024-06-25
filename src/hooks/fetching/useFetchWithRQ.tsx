import { APIEntityModel, APIService } from '@/services/api-services/api-service';
import useFetchWithReactQueryConfig from './useFetchWithRQConfig';
import PagingRequestQuery from '@/types/queries/PagingRequestQuery';

const useFetchWithReactQuery = <Model extends APIEntityModel, Query extends PagingRequestQuery>(
  keyBase: any[],
  apiService: APIService<Model>,
  requestQuery: Query,
  deps?: any[],
) => {
  return useFetchWithReactQueryConfig<Model>(
    keyBase,
    apiService,
    {
      params: { ...requestQuery },
    },
    [requestQuery, ...(deps || [])],
  );
};

export default useFetchWithReactQuery;
