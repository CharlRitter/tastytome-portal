/* eslint-disable no-param-reassign */
import { Draft, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { SettingsState } from '@/types/settings';
// import { MeasurementSystems } from '@/constants/measurements';
import { ThemeSettingOptions } from '@/constants/general';

const systemTheme = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;

const initialState: SettingsState = {
  isDarkTheme: false,
  // theme: ThemeSettingOptions.Auto,
  // units: MeasurementSystems.Metric,
  pantryStock: true,
  negativePantryStock: true,
  nutritionalInformation: true
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setIsDarkTheme: (state: Draft<SettingsState>, action: PayloadAction<boolean>) => {
      state.isDarkTheme = action.payload;
    },
    setThemeSetting: (state: Draft<SettingsState>, action: PayloadAction<string>) => {
      state.theme = action.payload;
      state.isDarkTheme =
        action.payload === ThemeSettingOptions.Auto ? systemTheme : action.payload === ThemeSettingOptions.Dark;
    },
    setMeasurementSystem: (state: Draft<SettingsState>, action: PayloadAction<string>) => {
      state.units = action.payload;
    },
    setPantryStock: (state: Draft<SettingsState>, action: PayloadAction<boolean>) => {
      state.pantryStock = action.payload;
    },
    setNegativePantryStock: (state: Draft<SettingsState>, action: PayloadAction<boolean>) => {
      state.negativePantryStock = action.payload;
    },
    setNutritionalInformation: (state: Draft<SettingsState>, action: PayloadAction<boolean>) => {
      state.nutritionalInformation = action.payload;
    }
  },
  extraReducers(builder) {
    builder.addCase(HYDRATE as any, (state, action) => {
      const { settings } = action.payload as any;

      return { ...state, ...settings };
    });
  }
});

export const {
  setIsDarkTheme,
  setThemeSetting,
  setMeasurementSystem,
  setPantryStock,
  setNegativePantryStock,
  setNutritionalInformation
} = settingsSlice.actions;
export default settingsSlice.reducer;
