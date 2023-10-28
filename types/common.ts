import { SerializedError } from '@reduxjs/toolkit';

export type SliceItem<T> = {
  data: T;
  status: string;
  error: SerializedError;
  totalCount?: number;
};
