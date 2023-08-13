import { AxiosResponse } from 'axios';
import axiosInstance from '@/api/axios';
import { Recipe } from '@/types/recipe';
import { ConstructApiQuery } from '@/utils/common';

const path = '/v1/recipe';

export async function getRecipes(query: {
  categories?: string;
  dateAscending?: string;
  effort?: string;
  rating?: string;
}): Promise<AxiosResponse> {
  return axiosInstance.get(`${path}${ConstructApiQuery(query)}`);
}

// export async function getRecipeById(id: number): Promise<AxiosResponse> {
//   return axiosInstance.get(`${path}/${id}`);
// }

export async function createRecipe(id: number, data: Partial<Recipe>): Promise<AxiosResponse> {
  return axiosInstance.post(`${path}/${id}`, data);
}

export async function updateRecipe(id: number, data: Partial<Recipe>): Promise<AxiosResponse> {
  return axiosInstance.put(`${path}/${id}`, data);
}

export async function deleteRecipe(id: number): Promise<AxiosResponse> {
  return axiosInstance.delete(`${path}/${id}`);
}
