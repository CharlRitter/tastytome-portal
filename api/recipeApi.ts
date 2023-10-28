import { AxiosResponse, axiosInstance } from '@/api/axios';
import { SuccessResponse } from '@/types/api';
import {
  CreateRecipeData,
  DeleteRecipeData,
  GetRecipeData,
  GetRecipesData,
  RecipeResponse,
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

export async function createRecipe(data: CreateRecipeData): Promise<AxiosResponse<void>> {
  const { body } = data;

  return axiosInstance.post(path, body);
}

export async function updateRecipe(data: UpdateRecipeData): Promise<AxiosResponse<void>> {
  const { body, recipeId } = data;

  return axiosInstance.put(`${path}/${recipeId}`, body);
}

export async function deleteRecipe(data: DeleteRecipeData): Promise<AxiosResponse<void>> {
  const { recipeId } = data;

  return axiosInstance.delete(`${path}/${recipeId}`);
}
