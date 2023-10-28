/* eslint-disable no-param-reassign */
import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as api from '@/api/recipeApi';
import { StatusTypes } from '@/constants/general';
import { SuccessResponse } from '@/types/api';
import {
  CreateRecipeData,
  DeleteRecipeData,
  GetRecipeData,
  GetRecipesData,
  RecipeResponse,
  RecipeState,
  UpdateRecipeData
} from '@/types/recipe';
import { withJWTSessionStorage } from '@/utils/common';

const initialState: RecipeState = {
  recipes: {
    error: {},
    status: StatusTypes.Fulfilled,
    data: []
  },
  recipe: {
    error: {},
    status: StatusTypes.Fulfilled,
    data: {
      id: 0,
      memberid: 0,
      image: null,
      measurementsystemid: 0,
      createdat: '',
      editedat: '',
      measurementsystem: {
        id: 0,
        value: ''
      },
      recipecategory: [],
      recipeingredient: [],
      recipeinstruction: [],
      recipetimer: [],
      title: '',
      description: '',
      rating: 0,
      effort: 0
    }
  }
};

export const getRecipes = createAsyncThunk<
  SuccessResponse<RecipeResponse[]>,
  GetRecipesData,
  {
    rejectValue: SerializedError;
  }
>('recipe/getRecipes', async (data, thunkAPI) => {
  try {
    const response = await withJWTSessionStorage(api.getRecipes(data));

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.response?.data ?? { message: 'Something went wrong' });
  }
});

export const getRecipe = createAsyncThunk<
  SuccessResponse<RecipeResponse>,
  GetRecipeData,
  {
    rejectValue: SerializedError;
  }
>('recipe/getRecipe', async (data, thunkAPI) => {
  try {
    const response = await withJWTSessionStorage(api.getRecipe(data));

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.response?.data ?? { message: 'Something went wrong' });
  }
});

export const createRecipe = createAsyncThunk<
  void,
  CreateRecipeData,
  {
    rejectValue: SerializedError;
  }
>('recipe/createRecipe', async (data, thunkAPI) => {
  try {
    const response = await withJWTSessionStorage(api.createRecipe(data));

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.response?.data ?? { message: 'Something went wrong' });
  }
});

export const updateRecipe = createAsyncThunk<
  void,
  UpdateRecipeData,
  {
    rejectValue: SerializedError;
  }
>('recipe/updateRecipe', async (data, thunkAPI) => {
  try {
    const response = await withJWTSessionStorage(api.updateRecipe(data));

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.response?.data ?? { message: 'Something went wrong' });
  }
});

export const deleteRecipe = createAsyncThunk<
  void,
  DeleteRecipeData,
  {
    rejectValue: SerializedError;
  }
>('recipe/deleteRecipe', async (data, thunkAPI) => {
  try {
    const response = await withJWTSessionStorage(api.deleteRecipe(data));

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.response?.data ?? { message: 'Something went wrong' });
  }
});

const recipeSlice = createSlice({
  name: 'recipeSlice',
  initialState,
  reducers: {
    clearRecipes: (state) => {
      state.recipes = initialState.recipes;
    },
    removeRecipes: (state, action) => {
      state.recipes.data = state.recipes.data.filter((recipe) => recipe.id !== action.payload);
    },
    clearRecipe: (state) => {
      state.recipe = initialState.recipe;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getRecipes.pending, (state) => {
      state.recipes.error = {};
      state.recipes.status = StatusTypes.Pending;
    });
    builder.addCase(getRecipes.fulfilled, (state, action) => {
      const {
        data,
        meta: { totalCount }
      } = action.payload;

      state.recipes.data.push(...data);
      state.recipes.totalCount = totalCount;
      state.recipes.status = StatusTypes.Fulfilled;
    });
    builder.addCase(getRecipes.rejected, (state, action) => {
      if (action.payload) {
        state.recipes.error = action.payload;
        state.recipes.error.message = `Error while retrieving recipes - ${action.payload.message}`;
      }
      state.recipes.status = StatusTypes.Rejected;
    });
    builder.addCase(getRecipe.pending, (state) => {
      state.recipes.error = {};
      state.recipe.status = StatusTypes.Pending;
    });
    builder.addCase(getRecipe.fulfilled, (state, action) => {
      const { data } = action.payload;

      state.recipe.data = data;
      state.recipe.status = StatusTypes.Fulfilled;
    });
    builder.addCase(getRecipe.rejected, (state, action) => {
      if (action.payload) {
        state.recipe.error = action.payload;
        state.recipe.error.message = `Error while retrieving recipe - ${action.payload.message}`;
      }
      state.recipe.status = StatusTypes.Rejected;
    });
    builder.addCase(createRecipe.pending, (state) => {
      state.recipes.error = {};
      state.recipe.status = StatusTypes.Pending;
    });
    builder.addCase(createRecipe.fulfilled, (state) => {
      state.recipe.status = StatusTypes.Fulfilled;
    });
    builder.addCase(createRecipe.rejected, (state, action) => {
      if (action.payload) {
        state.recipe.error = action.payload;
        state.recipe.error.message = `Error while adding recipe - ${action.payload.message}`;
      }
      state.recipe.status = StatusTypes.Rejected;
    });
    builder.addCase(updateRecipe.pending, (state) => {
      state.recipes.error = {};
      state.recipe.status = StatusTypes.Pending;
    });
    builder.addCase(updateRecipe.fulfilled, (state) => {
      state.recipe.status = StatusTypes.Fulfilled;
    });
    builder.addCase(updateRecipe.rejected, (state, action) => {
      if (action.payload) {
        state.recipe.error = action.payload;
        state.recipe.error.message = `Error while updating recipe - ${action.payload.message}`;
      }
      state.recipe.status = StatusTypes.Rejected;
    });
    builder.addCase(deleteRecipe.pending, (state) => {
      state.recipes.error = {};
      state.recipe.status = StatusTypes.Pending;
    });
    builder.addCase(deleteRecipe.fulfilled, (state) => {
      state.recipe.status = StatusTypes.Fulfilled;
    });
    builder.addCase(deleteRecipe.rejected, (state, action) => {
      if (action.payload) {
        state.recipe.error = action.payload;
        state.recipe.error.message = `Error while deleting recipe - ${action.payload.message}`;
      }
      state.recipe.status = StatusTypes.Rejected;
    });
  }
});

export const { clearRecipes, removeRecipes, clearRecipe } = recipeSlice.actions;
export const recipeReducer = recipeSlice.reducer;
