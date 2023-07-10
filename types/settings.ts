export interface SettingsState {
  isDarkTheme: boolean;
  theme: string;
  units: string;
  pantryStock: boolean;
  negativePantryStock: boolean;
  nutritionalInformation: boolean;
}

export interface SettingsRootState {
  settings: SettingsState;
}
