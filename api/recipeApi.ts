import { AxiosResponse, axiosInstance } from '@/api/axios';
import { SuccessResponse } from '@/types/api';
import {
  CreateRecipeData,
  DeleteRecipeData,
  GetRecipeData,
  GetRecipesData,
  RecipeResponse,
  ScrapeRecipeData,
  ScrapedRecipeResponse,
  UpdateRecipeData
} from '@/types/recipe';

const path = '/v1/recipe';

export async function getRecipes(data: GetRecipesData): Promise<AxiosResponse<SuccessResponse<RecipeResponse[]>>> {
  const { params } = data;

  return axiosInstance.get(path, { params });
}

export async function getRecipe(data: GetRecipeData): Promise<AxiosResponse<SuccessResponse<RecipeResponse>>> {
  const { recipeId } = data;

  return axiosInstance.get(`${path}/${recipeId}`);
}

export async function createRecipe(data: CreateRecipeData): Promise<AxiosResponse<SuccessResponse<void>>> {
  const { body } = data;

  return axiosInstance.post(path, body);
}

export async function updateRecipe(data: UpdateRecipeData): Promise<AxiosResponse<SuccessResponse<void>>> {
  const { body, recipeId } = data;

  return axiosInstance.put(`${path}/${recipeId}`, body);
}

export async function deleteRecipe(data: DeleteRecipeData): Promise<AxiosResponse<SuccessResponse<void>>> {
  const { recipeId } = data;

  return axiosInstance.delete(`${path}/${recipeId}`);
}

export async function scrapeRecipe(
  data: ScrapeRecipeData
): Promise<AxiosResponse<SuccessResponse<ScrapedRecipeResponse>>> {
  const { body } = data;

  return axiosInstance.post(`${path}/scrape`, body, );
}
