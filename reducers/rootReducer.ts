import { combineReducers } from '@reduxjs/toolkit';
import settingsReducer from '@/slices/settingsSlice';
import enumSlice from '@/slices/enumSlice';
import memberSlice from '@/slices/memberSlice';
import recipeSlice from '@/slices/recipeSlice';

const rootReducer = combineReducers({
  enum: enumSlice,
  member: memberSlice,
  recipe: recipeSlice,
  // settings: settingsReducer,
});

export default rootReducer;
