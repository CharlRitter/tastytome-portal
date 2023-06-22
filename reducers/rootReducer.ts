import { combineReducers } from '@reduxjs/toolkit';
import themeReducer from '@/slices/themeSlice';

const rootReducer = combineReducers({
  isDarkMode: themeReducer,
});

export default rootReducer;
