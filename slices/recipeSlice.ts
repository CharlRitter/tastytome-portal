/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '@/api/recipeApi';
import { GetRecipeResponse, Recipe, RecipeIngredient, RecipeState, RecipeTimer } from '@/types/recipe';
import { OperationTypes, StatusTypes } from '@/constants/general';
import handleAsyncThunk from '@/utils/api';

const initialState: RecipeState = {
  recipes: {
    error: null,
    status: StatusTypes.Fulfilled,
    operation: null,
    totalCount: 0,
    value: []
  },
  recipe: {
    error: null,
    status: StatusTypes.Fulfilled,
    operation: null,
    value: {
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
    }
  }
};

export const getRecipes = createAsyncThunk(
  'recipe/getRecipes',
  async (
    query: {
      categories?: string;
      dateAscending?: string;
      effort?: number;
      rating?: number;
      page?: number;
      pageSize?: number;
    },
    thunkAPI
  ): Promise<GetRecipeResponse> => handleAsyncThunk(thunkAPI, () => api.getRecipes(query))
);

export const getRecipe = createAsyncThunk(
  'recipe/getRecipe',
  async (id: number, thunkAPI): Promise<Recipe> => handleAsyncThunk(thunkAPI, () => api.getRecipe(id))
);

export const createRecipe = createAsyncThunk(
  'recipe/createRecipe',
  async (
    {
      id,
      data
    }: {
      id: number;
      data: Partial<Recipe> & {
        recipecategories: number[];
        recipeingredients: Partial<RecipeIngredient[]>;
        recipeinstructions: string[];
        recipetimers: Partial<RecipeTimer[]>;
      };
    },
    thunkAPI
  ) => handleAsyncThunk(thunkAPI, () => api.createRecipe(id, data))
);

export const updateRecipe = createAsyncThunk(
  'recipe/updateRecipe',
  async ({ id, data }: { id: number; data: Recipe }, thunkAPI) =>
    handleAsyncThunk(thunkAPI, () => api.updateRecipe(id, data))
);

export const deleteRecipe = createAsyncThunk('recipe/deleteRecipe', async (id: number, thunkAPI) =>
  handleAsyncThunk(thunkAPI, () => api.deleteRecipe(id))
);

const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    clearRecipes: (state) => {
      state.recipes = {
        error: null,
        status: StatusTypes.Fulfilled,
        operation: null,
        totalCount: 0,
        value: []
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRecipes.pending, (state) => {
        state.recipes.error = null;
        state.recipes.status = StatusTypes.Pending;
        state.recipes.operation = OperationTypes.Get;
      })
      .addCase(getRecipes.fulfilled, (state, action) => {
        const { recipes, totalCount } = action.payload;

        state.recipes.value = recipes;
        state.recipes.totalCount = totalCount;
        state.recipes.status = StatusTypes.Fulfilled;
      })
      .addCase(getRecipes.rejected, (state, action) => {
        state.recipes.error = action.payload as string | null;
        state.recipes.status = StatusTypes.Rejected;
      })
      .addCase(getRecipe.pending, (state) => {
        state.recipe.error = null;
        state.recipe.status = StatusTypes.Pending;
        state.recipe.operation = OperationTypes.Get;
      })
      .addCase(getRecipe.fulfilled, (state, action) => {
        state.recipe.value = action.payload;
        state.recipe.status = StatusTypes.Fulfilled;
      })
      .addCase(getRecipe.rejected, (state, action) => {
        state.recipe.error = action.payload as string | null;
        state.recipe.status = StatusTypes.Rejected;
      })
      .addCase(createRecipe.pending, (state) => {
        state.recipe.error = null;
        state.recipe.status = StatusTypes.Pending;
        state.recipe.operation = OperationTypes.Create;
      })
      .addCase(createRecipe.fulfilled, (state) => {
        state.recipe.status = StatusTypes.Fulfilled;
      })
      .addCase(createRecipe.rejected, (state, action) => {
        state.recipe.error = action.payload as string | null;
        state.recipe.status = StatusTypes.Rejected;
      })
      .addCase(updateRecipe.pending, (state) => {
        state.recipe.error = null;
        state.recipe.status = StatusTypes.Pending;
        state.recipe.operation = OperationTypes.Update;
      })
      .addCase(updateRecipe.fulfilled, (state) => {
        state.recipe.status = StatusTypes.Fulfilled;
      })
      .addCase(updateRecipe.rejected, (state, action) => {
        state.recipe.error = action.payload as string | null;
        state.recipe.status = StatusTypes.Rejected;
      })
      .addCase(deleteRecipe.pending, (state) => {
        state.recipe.error = null;
        state.recipe.status = StatusTypes.Pending;
        state.recipe.operation = OperationTypes.Delete;
      })
      .addCase(deleteRecipe.fulfilled, (state) => {
        state.recipe.status = StatusTypes.Fulfilled;
      })
      .addCase(deleteRecipe.rejected, (state, action) => {
        state.recipe.error = action.payload as string | null;
        state.recipe.status = StatusTypes.Rejected;
      });
  }
});

export const { clearRecipes } = recipeSlice.actions;

export default recipeSlice.reducer;
