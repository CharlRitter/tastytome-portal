import { Theme } from '@mui/system';
import { SerializedError } from '@reduxjs/toolkit';

export interface StyledProps {
  theme?: Theme;
  isDragActive?: boolean;
  disabled?: boolean;
  isMediumScreen?: boolean;
}

export interface SliceItem<T> {
  data: T;
  status: string;
  error: SerializedError | null;
  totalCount: number | null;
}
