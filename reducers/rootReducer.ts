import { combineReducers } from '@reduxjs/toolkit';

import { enumReducer } from '@/slices/enumSlice';
import { memberReducer } from '@/slices/memberSlice';
import { recipeReducer } from '@/slices/recipeSlice';

export const rootReducer = combineReducers({
  enumSlice: enumReducer,
  memberSlice: memberReducer,
  recipeSlice: recipeReducer
});
