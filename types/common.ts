import { Theme } from '@mui/system';

export interface StyledProps {
  theme?: Theme;
  isDragActive?: boolean;
  disabled?: boolean;
  isMediumScreen?: boolean;
}

export interface SliceItem<T> {
  value: T;
  status: string;
  operation: string | null;
  error: string | null;
  totalCount?: number;
}
