import axiosInstance, { AxiosResponse } from '@/api/axios';
import { SuccessResponse } from '@/types/api';
import {
  CreateRecipeData,
  DeleteRecipeData,
  GetRecipeData,
  GetRecipesData,
  Recipe,
  UpdateRecipeData
} from '@/types/recipe';

const path = '/v1/recipe';

export async function getRecipes(data: GetRecipesData): Promise<AxiosResponse<SuccessResponse<Recipe[]>>> {
  const { params } = data;

  return axiosInstance.get(path, { params });
}

export async function getRecipe(data: GetRecipeData): Promise<AxiosResponse<SuccessResponse<Recipe>>> {
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
