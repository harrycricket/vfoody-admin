import useFetchWithRQConfigWithFetchFunction from './useFetchWithRQConfigWithFetchFunction';

const useFetchWithRQWtihFetchFunction = <Response, Query extends Object>(
  keyBase: any[],
  fetchFunc: () => Promise<Response>,
  requestQuery: Query,
) => {
  return useFetchWithRQConfigWithFetchFunction<Response>(
    keyBase,
    fetchFunc,
    {
      params: { ...requestQuery },
    },
    [requestQuery],
  );
};

export default useFetchWithRQWtihFetchFunction;
