/* eslint-disable no-param-reassign */
import { Draft, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { THEMES, UNITS } from '@/constants/general';
import { SettingsState } from '@/types/settings';

const systemTheme = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;

const initialState: SettingsState = {
  isDarkTheme: false,
  theme: THEMES.mapping.auto,
  units: UNITS.mapping.metric,
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
    setTheme: (state: Draft<SettingsState>, action: PayloadAction<number>) => {
      state.theme = action.payload;
      state.isDarkTheme =
        action.payload === THEMES.mapping.auto
          ? systemTheme
          : action.payload === THEMES.options[THEMES.mapping.dark].value;
    },
    setUnits: (state: Draft<SettingsState>, action: PayloadAction<number>) => {
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

export const { setIsDarkTheme, setTheme, setUnits, setPantryStock, setNegativePantryStock, setNutritionalInformation } =
  settingsSlice.actions;
export default settingsSlice.reducer;
