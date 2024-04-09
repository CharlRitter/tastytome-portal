/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { CustomAxiosResponse } from '@/api/axios';
import * as api from '@/api/recipeApi';
import { StatusTypes } from '@/constants/general';
import { CustomSerializedError, SuccessResponse } from '@/types/api';
import {
  CreateRecipeData,
  DeleteRecipeData,
  GetRecipeData,
  GetRecipesData,
  RecipeResponse,
  RecipeState,
  ScrapeRecipeData,
  ScrapedRecipeResponse,
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
      createdat: '',
      editedat: '',
      recipecategory: [],
      recipeingredient: [],
      recipeinstruction: [],
      recipetimer: [],
      title: '',
      description: '',
      rating: 0,
      effort: 0
    }
  },
  scrapedRecipe: {
    error: {},
    status: StatusTypes.Fulfilled,
    data: {
      title: '',
      description: '',
      image: null,
      recipeingredients: [],
      recipeinstructions: []
    }
  }
};

export const getRecipes = createAsyncThunk<
  CustomAxiosResponse<SuccessResponse<RecipeResponse[]>>,
  GetRecipesData,
  { rejectValue: CustomSerializedError }
>('recipe/getRecipes', async (data, thunkAPI) => {
  try {
    const response = await withJWTSessionStorage(api.getRecipes(data));

    return { data: response.data, status: response.status, statusText: response.statusText };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      { status: error?.response.status, ...error?.response?.data } ?? { message: 'Something went wrong', status: 500 }
    );
  }
});

export const getRecipe = createAsyncThunk<
  CustomAxiosResponse<SuccessResponse<RecipeResponse>>,
  GetRecipeData,
  { rejectValue: CustomSerializedError }
>('recipe/getRecipe', async (data, thunkAPI) => {
  try {
    const response = await withJWTSessionStorage(api.getRecipe(data));

    return { data: response.data, status: response.status, statusText: response.statusText };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      { status: error?.response.status, ...error?.response?.data } ?? { message: 'Something went wrong', status: 500 }
    );
  }
});

export const createRecipe = createAsyncThunk<
  CustomAxiosResponse<void>,
  CreateRecipeData,
  { rejectValue: CustomSerializedError }
>('recipe/createRecipe', async (data, thunkAPI) => {
  try {
    const response = await withJWTSessionStorage(api.createRecipe(data));

    return { data: response.data, status: response.status, statusText: response.statusText };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      { status: error?.response.status, ...error?.response?.data } ?? { message: 'Something went wrong', status: 500 }
    );
  }
});

export const updateRecipe = createAsyncThunk<
  CustomAxiosResponse<void>,
  UpdateRecipeData,
  { rejectValue: CustomSerializedError }
>('recipe/updateRecipe', async (data, thunkAPI) => {
  try {
    const response = await withJWTSessionStorage(api.updateRecipe(data));

    return { data: response.data, status: response.status, statusText: response.statusText };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      { status: error?.response.status, ...error?.response?.data } ?? { message: 'Something went wrong', status: 500 }
    );
  }
});

export const deleteRecipe = createAsyncThunk<
  CustomAxiosResponse<void>,
  DeleteRecipeData,
  { rejectValue: CustomSerializedError }
>('recipe/deleteRecipe', async (data, thunkAPI) => {
  try {
    const response = await withJWTSessionStorage(api.deleteRecipe(data));

    return { data: response.data, status: response.status, statusText: response.statusText };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      { status: error?.response.status, ...error?.response?.data } ?? { message: 'Something went wrong', status: 500 }
    );
  }
});

export const scrapeRecipe = createAsyncThunk<
  CustomAxiosResponse<SuccessResponse<ScrapedRecipeResponse>>,
  ScrapeRecipeData,
  { rejectValue: CustomSerializedError }
>('recipe/scrapeRecipe', async (data, thunkAPI) => {
  try {
    const response = await withJWTSessionStorage(api.scrapeRecipe(data));

    return { data: response.data, status: response.status, statusText: response.statusText };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.response?.data ?? { message: 'Something went wrong', status: 500 });
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
        data: {
          data,
          meta: { totalCount }
        }
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
      const {
        data: { data }
      } = action.payload;

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
    builder.addCase(scrapeRecipe.pending, (state) => {
      state.scrapedRecipe.error = {};
      state.scrapedRecipe.status = StatusTypes.Pending;
    });
    builder.addCase(scrapeRecipe.fulfilled, (state, action) => {
      const {
        data: { data }
      } = action.payload;

      state.scrapedRecipe.data = data;
      state.scrapedRecipe.status = StatusTypes.Fulfilled;
    });
    builder.addCase(scrapeRecipe.rejected, (state, action) => {
      if (action.payload) {
        state.scrapedRecipe.error = action.payload;
        state.scrapedRecipe.error.message = `Error while scraping recipe - ${action.payload.message}`;
      }
      state.scrapedRecipe.status = StatusTypes.Rejected;
    });
  }
});

export const { clearRecipes, removeRecipes, clearRecipe } = recipeSlice.actions;
export const recipeReducer = recipeSlice.reducer;
