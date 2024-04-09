import { SerializedError } from '@reduxjs/toolkit';

export type SuccessResponse<T> = {
  data: T;
  meta: { totalCount: number };
};

export type CustomSerializedError = Omit<SerializedError, 'code'> & { status?: number };
