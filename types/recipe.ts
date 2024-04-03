import { SliceItem } from '@/types/common';
import { Category, MeasurementSystem, MeasurementType, MeasurementUnit } from '@/types/enum';

export type RecipeCategory = {
  id: number;
  recipeid: number;
  categoryid: number;
  category: Category;
  createdat: string;
};

export type RecipeIngredientBase = {
  title: string;
};

export type RecipeIngredientRequest = RecipeIngredientBase & {
  measurementtype: MeasurementType | null;
  measurementunit: MeasurementUnit | null;
  measurementamount: number | null;
};

export type RecipeIngredientResponse = RecipeIngredientBase & {
  id: number;
  recipeid: number;
  measurementtypeid: number;
  measurementtype: MeasurementType;
  measurementunitid: number;
  measurementunit: MeasurementUnit;
  measurementamount: number;
};

export type RecipeInstructionBase = {
  title: string;
};

// TODO: ADD LINKS TO TIMERS & TEMPS HERE
export type RecipeInstructionRequest = RecipeInstructionBase;

export type RecipeInstructionResponse = RecipeInstructionBase & {
  id: number;
  recipeid: number;
  createdat: string;
};

export type RecipeTimerBase = {
  title: string;
  hours: number;
  minutes: number;
};

export type RecipeTimerRequest = RecipeTimerBase;

export type RecipeTimerResponse = RecipeTimerBase & {
  id: number;
  recipeid: number;
  createdat: string;
};

export type RecipeBase = {
  title: string;
  description: string;
  image: string | File | null;
  rating: number;
  effort: number;
};

export type RecipeRequest = RecipeBase & {
  measurementsystemid: number;
  recipecategories: number[];
  recipeingredients: RecipeIngredientRequest[];
  recipeinstructions: string[];
  recipetimers: RecipeTimerRequest[];
};

export type RecipeResponse = RecipeBase & {
  id: number;
  memberid: number;
  image: string | null;
  measurementsystemid: number;
  createdat: string;
  editedat: string;
  measurementsystem: MeasurementSystem;
  recipecategory: RecipeCategory[];
  recipeingredient: RecipeIngredientResponse[];
  recipeinstruction: RecipeInstructionResponse[];
  recipetimer: RecipeTimerResponse[];
};

export type ScrapedRecipeResponse = {
  title: string;
  description: string;
  image: string | null;
  measurementsystemid: number;
  recipeingredients: string[];
  recipeinstructions: string[];
};

export type RecipeState = {
  recipes: SliceItem<RecipeResponse[]>;
  recipe: SliceItem<RecipeResponse>;
  scrapedRecipe: SliceItem<ScrapedRecipeResponse>;
};

export type GetRecipesData = {
  params: {
    categories?: string;
    effort?: number;
    rating?: number;
    orderBy?: string;
    page?: number;
    pageSize?: number;
  };
};

export type GetRecipeData = {
  recipeId: number;
};

export type CreateRecipeData = {
  body: RecipeRequest & {
    recipecategories: number[];
    recipeingredients: Partial<RecipeIngredientRequest[]>;
    recipeinstructions: string[];
    recipetimers: Partial<RecipeTimerRequest[]>;
  };
};

export type UpdateRecipeData = CreateRecipeData & {
  recipeId: number;
};

export type DeleteRecipeData = {
  recipeId: number;
};

export type ScrapeRecipeData = {
  body: { recipeUrl: string };
};
