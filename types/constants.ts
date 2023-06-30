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

export interface ThemeAutocompleteOptions extends AutocompleteOptions {
  mapping: { auto: number; dark: number; light: number };
}

export interface UnitAutocompleteOptions extends AutocompleteOptions {
  mapping: { metric: number; us: number; imperial: number };
}
