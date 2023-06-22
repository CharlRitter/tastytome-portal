import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'isDarkMode',
  initialState: false,
  reducers: {
    setIsDarkMode: (_, action) => action.payload
  }
});

export const { setIsDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
