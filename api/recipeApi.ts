import { AxiosResponse } from 'axios';
import axiosInstance from '@/api/axios';
import { Recipe } from '@/types/recipe';
import { constructApiQuery } from '@/utils/common';

const path = '/v1/recipe';

export async function getRecipes(query: {
  categories?: string;
  dateAscending?: string;
  effort?: number;
  rating?: number;
  page?: number;
  pageSize?: number;
}): Promise<AxiosResponse> {
  return axiosInstance.get(`${path}${constructApiQuery(query)}`);
}

export async function getRecipe(id: number): Promise<AxiosResponse> {
  return axiosInstance.get(`${path}/${id}`);
}

export async function createRecipe(id: number, data: Partial<Recipe>): Promise<AxiosResponse> {
  return axiosInstance.post(`${path}/${id}`, data);
}

export async function updateRecipe(id: number, data: Partial<Recipe>): Promise<AxiosResponse> {
  return axiosInstance.put(`${path}/${id}`, data);
}

export async function deleteRecipe(id: number): Promise<AxiosResponse> {
  return axiosInstance.delete(`${path}/${id}`);
}
