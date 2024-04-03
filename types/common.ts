import { CustomSerializedError } from '@/types/api';

export type SliceItem<T> = {
  data: T;
  status: string;
  error: CustomSerializedError;
  totalCount?: number;
};
