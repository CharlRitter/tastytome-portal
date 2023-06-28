import { combineReducers } from '@reduxjs/toolkit';
import settingsReducer from '@/slices/settings';

const rootReducer = combineReducers({
  settings: settingsReducer,
});

export default rootReducer;
