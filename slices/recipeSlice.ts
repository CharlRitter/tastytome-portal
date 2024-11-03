import { createSlice } from '@reduxjs/toolkit';

import * as api from '@/api/recipeApi';
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
import { createThunk, withJWTSessionStorage } from '@/utils/common';

const initialState: RecipeState = {
  recipes: {
    data: []
  },
  recipe: {
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
      effort: 0,
      bookmarked: false
    }
  },
  scrapedRecipe: {
    data: {
      title: '',
      description: '',
      image: null,
      recipeingredients: [],
      recipeinstructions: []
    }
  }
};

export const getRecipes = createThunk<RecipeResponse[], GetRecipesData>(
  (data) => withJWTSessionStorage(api.getRecipes(data)),
  'recipe/getRecipes'
);
export const getRecipe = createThunk<RecipeResponse, GetRecipeData>(
  (data) => withJWTSessionStorage(api.getRecipe(data)),
  'recipe/getRecipe'
);
export const createRecipe = createThunk<void, CreateRecipeData>(
  (data) => withJWTSessionStorage(api.createRecipe(data)),
  'recipe/createRecipe'
);
export const updateRecipe = createThunk<void, UpdateRecipeData>(
  (data) => withJWTSessionStorage(api.updateRecipe(data)),
  'recipe/updateRecipe'
);
export const deleteRecipe = createThunk<void, DeleteRecipeData>(
  (data) => withJWTSessionStorage(api.deleteRecipe(data)),
  'recipe/deleteRecipe'
);
export const scrapeRecipe = createThunk<ScrapedRecipeResponse, ScrapeRecipeData>(
  (data) => withJWTSessionStorage(api.scrapeRecipe(data)),
  'recipe/scrapeRecipe'
);

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
    builder.addCase(getRecipes.fulfilled, (state, action) => {
      const {
        data: {
          data,
          meta: { totalCount }
        }
      } = action.payload;

      state.recipes.data.push(...data);
      state.recipes.totalCount = totalCount;
    });
    builder.addCase(getRecipe.fulfilled, (state, action) => {
      const {
        data: { data }
      } = action.payload;

      state.recipe.data = data;
    });
    builder.addCase(scrapeRecipe.fulfilled, (state, action) => {
      const {
        data: { data }
      } = action.payload;

      state.scrapedRecipe.data = data;
    });
  }
});

export const { clearRecipes, removeRecipes, clearRecipe } = recipeSlice.actions;
export const recipeReducer = recipeSlice.reducer;
