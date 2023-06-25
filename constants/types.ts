import { ReactNode } from 'react';

export interface RootReducerState {
  isDarkMode: boolean;
}

export interface Page {
  title: string;
  route: string;
  icon: ReactNode;
}

export interface InfoModal {
  id: number;
  title: string;
  icon: ReactNode;
}
