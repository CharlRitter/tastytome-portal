import { AutocompleteOptions } from '@/constants/types';

export const DRAWER_WIDTH = 240;

interface ThemeAutocompleteOptions extends AutocompleteOptions {
  mapping: { auto: number; dark: number; light: number };
}

export const THEMES: ThemeAutocompleteOptions = {
  options: [
    { label: 'Auto', value: 0 },
    { label: 'Dark', value: 1 },
    { label: 'Light', value: 2 }
  ],
  mapping: { auto: 0, dark: 1, light: 2 }
};

interface UnitAutocompleteOptions extends AutocompleteOptions {
  mapping: { metric: number; us: number; imperial: number };
}

export const UNITS: UnitAutocompleteOptions = {
  options: [
    { label: 'Metric', value: 0 },
    { label: 'US', value: 1 },
    { label: 'Imperial', value: 2 }
  ],
  mapping: { metric: 0, us: 1, imperial: 2 }
};
