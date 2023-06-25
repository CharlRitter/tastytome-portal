import { createSlice } from '@reduxjs/toolkit';

const isSystemDarkMode =
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

const themeSlice = createSlice({
  name: 'isDarkMode',
  initialState: isSystemDarkMode,
  reducers: {
    setIsDarkMode: (_, action) => action.payload
  }
});

export const { setIsDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
