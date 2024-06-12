import { APIModel, APIService } from '@/services/api-services/api-service';
import useFetchWithReactQueryConfig from './useFetchWithReactQueryConfig';
import PagingRequestQuery from '@/types/queries/PagingRequestQuery';

const useFetchWithReactQuery = <Model extends APIModel, Query extends PagingRequestQuery>(
  keyBase: any[],
  apiService: APIService<Model>,
  requestQuery: Query,
) => {
  return useFetchWithReactQueryConfig<Model>(keyBase, apiService, {
    params: { ...requestQuery },
  });
};

export default useFetchWithReactQuery;
