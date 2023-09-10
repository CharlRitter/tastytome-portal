export interface SuccessResponse<T> {
  data: T;
  meta: { totalCount?: number };
}
