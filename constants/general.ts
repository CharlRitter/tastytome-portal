import { AutocompleteOption } from '@/constants/types';

export const DRAWER_WIDTH = 240;

export const THEMES: AutocompleteOption[] = [
  { label: 'Auto', value: 0 },
  { label: 'Dark', value: 1 },
  { label: 'Light', value: 2 }
];

export const UNITS: AutocompleteOption[] = [
  { label: 'Metric', value: 0 },
  { label: 'US', value: 1 },
  { label: 'Imperial', value: 2 }
];
