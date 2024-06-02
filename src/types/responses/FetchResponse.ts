import PageableModel from '../models/PageableModel';
export type FetchResponseValue<T> = PageableModel & {
  items: Array<T>;
};

type FetchResponse<T> = {
  isSuccess: boolean;
  isFailure: boolean;
  error: {
    code: '';
    message: '';
  };
  value: FetchResponseValue<T>;
};

export default FetchResponse;
