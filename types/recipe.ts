import { Category, MeasurementSystem, MeasurementType, MeasurementUnit } from '@/types/enum';
import { SliceItem } from '@/types/common';

export interface RecipeCategory {
  id: number;
  recipeid: number;
  categoryid: number;
  category: Category;
  createdat: string;
}

export interface RecipeIngredient {
  id: number | null;
  recipeid: number;
  title: string;
  measurementtypeid: number;
  measurementtype?: MeasurementType | null;
  measurementunitid: number;
  measurementunit?: MeasurementUnit | null;
  measurementamount: number | null;
  createdat: string;
}

export interface RecipeInstruction {
  id: number | null;
  recipeid: number;
  title: string;
  createdat: string;
}

export interface RecipeTimer {
  id: number | null;
  recipeid: number;
  title: string;
  hours: number | null;
  minutes: number | null;
  createdat: string;
}

export interface Recipe {
  id?: number;
  memberid?: number;
  title: string;
  description: string;
  image: string | File | null;
  rating: number;
  effort: number;
  measurementsystem?: MeasurementSystem;
  measurementsystemid: number;
  createdat?: string;
  editedat?: string;
  recipecategory: RecipeCategory[];
  recipeingredient: RecipeIngredient[];
  recipeinstruction: RecipeInstruction[];
  recipetimer: RecipeTimer[];
}

export interface RecipeState {
  recipes: SliceItem<Recipe[]>;
  recipe: SliceItem<Recipe>;
}

export interface GetRecipesData {
  params: {
    categories?: string;
    effort?: number;
    rating?: number;
    orderBy?: string;
    page?: number;
    pageSize?: number;
  };
}
export interface GetRecipeData {
  recipeId: number;
}
export interface CreateRecipeData {
  body: Partial<Recipe> & {
    recipecategories: number[];
    recipeingredients: Partial<RecipeIngredient[]>;
    recipeinstructions: string[];
    recipetimers: Partial<RecipeTimer[]>;
  };
}
export interface UpdateRecipeData {
  recipeId: number;
  body: Partial<Recipe> & {
    recipecategories: number[];
    recipeingredients: Partial<RecipeIngredient[]>;
    recipeinstructions: string[];
    recipetimers: Partial<RecipeTimer[]>;
  };
}
export interface DeleteRecipeData {
  recipeId: number;
}
