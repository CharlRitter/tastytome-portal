export type SuccessResponse<T> = {
  data: T;
  meta: { totalCount: number };
};
