import { ReactNode } from 'react';

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

export interface InfoModals {
  unsetModal: number;
  modals: InfoModal[];
}

export interface AutocompleteOption {
  label: string;
  value: number;
}

export interface AutocompleteOptions {
  options: AutocompleteOption[];
}
