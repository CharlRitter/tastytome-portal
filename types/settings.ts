export interface SettingsState {
  isDarkTheme: boolean;
  theme: number;
  units: number;
  pantryStock: boolean;
  negativePantryStock: boolean;
  nutritionalInformation: boolean;
}

export interface SettingsRootState {
  settings: SettingsState;
}
