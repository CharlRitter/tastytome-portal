import { combineReducers } from '@reduxjs/toolkit';
import themeReducer from '@/slices/theme';

const rootReducer = combineReducers({
  isDarkMode: themeReducer,
});

export default rootReducer;
