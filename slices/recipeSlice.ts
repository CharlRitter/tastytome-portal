/* eslint-disable no-param-reassign */
import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '@/api/recipeApi';
import {
  CreateRecipeData,
  DeleteRecipeData,
  GetRecipeData,
  GetRecipesData,
  Recipe,
  RecipeState,
  UpdateRecipeData
} from '@/types/recipe';
import { SuccessResponse } from '@/types/api';
import { StatusTypes } from '@/constants/general';
import handleAsyncThunk from '@/utils/api';

const initialState: RecipeState = {
  recipes: {
    error: null,
    status: StatusTypes.Fulfilled,
    totalCount: 0,
    data: []
  },
  recipe: {
    error: null,
    status: StatusTypes.Fulfilled,
    data: {
      title: '',
      description: '',
      image: null,
      rating: 0,
      effort: 0,
      measurementsystemid: 0,
      recipecategory: [],
      recipeingredient: [],
      recipeinstruction: [],
      recipetimer: []
    },
    totalCount: null
  }
};

export const getRecipes = createAsyncThunk(
  'recipe/getRecipes',
  async (data: GetRecipesData, thunkAPI): Promise<SuccessResponse<Recipe[]>> =>
    handleAsyncThunk(thunkAPI, () => api.getRecipes(data))
);

export const getRecipe = createAsyncThunk(
  'recipe/getRecipe',
  async (data: GetRecipeData, thunkAPI): Promise<SuccessResponse<Recipe>> =>
    handleAsyncThunk(thunkAPI, () => api.getRecipe(data))
);

export const createRecipe = createAsyncThunk(
  'recipe/createRecipe',
  async (data: CreateRecipeData, thunkAPI): Promise<void> => handleAsyncThunk(thunkAPI, () => api.createRecipe(data))
);

export const updateRecipe = createAsyncThunk(
  'recipe/updateRecipe',
  async (data: UpdateRecipeData, thunkAPI): Promise<void> => handleAsyncThunk(thunkAPI, () => api.updateRecipe(data))
);

export const deleteRecipe = createAsyncThunk(
  'recipe/deleteRecipe',
  async (data: DeleteRecipeData, thunkAPI): Promise<void> => handleAsyncThunk(thunkAPI, () => api.deleteRecipe(data))
);

const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    clearRecipes: (state) => {
      state.recipes = {
        error: null,
        status: StatusTypes.Fulfilled,

        totalCount: 0,
        data: []
      };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getRecipes.pending, (state) => {
      state.recipes.error = null;
      state.recipes.status = StatusTypes.Pending;
    });
    builder.addCase(getRecipes.fulfilled, (state, action) => {
      const {
        data,
        meta: { totalCount }
      } = action.payload as SuccessResponse<Recipe[]>;

      state.recipes.data = data;
      state.recipes.totalCount = totalCount as number;
      state.recipes.status = StatusTypes.Fulfilled;
    });
    builder.addCase(getRecipes.rejected, (state, action) => {
      state.recipes.error = action.payload as SerializedError;
      state.recipes.status = StatusTypes.Rejected;
    });
    builder.addCase(getRecipe.pending, (state) => {
      state.recipe.error = null;
      state.recipe.status = StatusTypes.Pending;
    });
    builder.addCase(getRecipe.fulfilled, (state, action) => {
      const { data } = action.payload as SuccessResponse<Recipe>;

      state.recipe.data = data;
      state.recipe.status = StatusTypes.Fulfilled;
    });
    builder.addCase(getRecipe.rejected, (state, action) => {
      state.recipe.error = action.payload as SerializedError;
      state.recipe.status = StatusTypes.Rejected;
    });
    builder.addCase(createRecipe.pending, (state) => {
      state.recipe.error = null;
      state.recipe.status = StatusTypes.Pending;
    });
    builder.addCase(createRecipe.fulfilled, (state) => {
      state.recipe.status = StatusTypes.Fulfilled;
    });
    builder.addCase(createRecipe.rejected, (state, action) => {
      state.recipe.error = action.payload as SerializedError;
      state.recipe.status = StatusTypes.Rejected;
    });
    builder.addCase(updateRecipe.pending, (state) => {
      state.recipe.error = null;
      state.recipe.status = StatusTypes.Pending;
    });
    builder.addCase(updateRecipe.fulfilled, (state) => {
      state.recipe.status = StatusTypes.Fulfilled;
    });
    builder.addCase(updateRecipe.rejected, (state, action) => {
      state.recipe.error = action.payload as SerializedError;
      state.recipe.status = StatusTypes.Rejected;
    });
    builder.addCase(deleteRecipe.pending, (state) => {
      state.recipe.error = null;
      state.recipe.status = StatusTypes.Pending;
    });
    builder.addCase(deleteRecipe.fulfilled, (state) => {
      state.recipe.status = StatusTypes.Fulfilled;
    });
    builder.addCase(deleteRecipe.rejected, (state, action) => {
      state.recipe.error = action.payload as SerializedError;
      state.recipe.status = StatusTypes.Rejected;
    });
  }
});

export const { clearRecipes } = recipeSlice.actions;

export default recipeSlice.reducer;
