import { ReactNode } from 'react';

export type Page = {
  title: string;
  route: string;
  icon: ReactNode;
};

export type InfoModal = {
  id: number;
  title: string;
  icon: ReactNode;
};

export type InfoModals = {
  unsetModal: number;
  modals: InfoModal[];
};
