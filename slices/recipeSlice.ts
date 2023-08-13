/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '@/api/recipeApi';
import { Recipe, RecipeIngredient, RecipeState, RecipeTimer } from '@/types/recipe';
import handleAsyncThunk from '@/utils/api';

const initialState: RecipeState = {
  error: null,
  loading: false,
  recipes: []
};

export const getRecipes = createAsyncThunk(
  'recipe/getRecipes',
  async (
    query: { categories?: string; dateAscending?: string; effort?: string; rating?: string },
    thunkAPI
  ): Promise<Recipe[]> => handleAsyncThunk(thunkAPI, () => api.getRecipes(query))
);

// export const getRecipeById = createAsyncThunk(
//   'recipe/getRecipeById',
//   async (id: number, thunkAPI): Promise<Recipe> => handleAsyncThunk(thunkAPI, () => api.getRecipeById(id))
// );

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

export const deleteRecipe = createAsyncThunk('recipe/deleteRecipe', async (id: number, thunkAPI): Promise<void> => {
  handleAsyncThunk(thunkAPI, () => api.deleteRecipe(id));
  thunkAPI.dispatch(getRecipes());
});

const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRecipes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRecipes.fulfilled, (state, action) => {
        state.recipes = action.payload;
        state.loading = false;
      })
      .addCase(getRecipes.rejected, (state, action) => {
        state.error = action.payload as string | null;
        state.loading = false;
      })
      // .addCase(getRecipeById.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(getRecipeById.fulfilled, (state, action) => {
      //   state.recipe = action.payload;
      //   state.loading = false;
      // })
      // .addCase(getRecipeById.rejected, (state, action) => {
      //   state.error = action.payload as string | null;
      //   state.loading = false;
      // })
      .addCase(createRecipe.pending, (state) => {
        state.loading = true;
      })
      .addCase(createRecipe.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createRecipe.rejected, (state, action) => {
        state.error = action.payload as string | null;
        state.loading = false;
      })
      .addCase(updateRecipe.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRecipe.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateRecipe.rejected, (state, action) => {
        state.error = action.payload as string | null;
        state.loading = false;
      })
      .addCase(deleteRecipe.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRecipe.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteRecipe.rejected, (state, action) => {
        state.error = action.payload as string | null;
        state.loading = false;
      });
  }
});

export default recipeSlice.reducer;
