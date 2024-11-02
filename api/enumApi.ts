import { CustomAxiosResponse, axiosInstance } from '@/api/axios';
import { SuccessResponse } from '@/types/api';
import { Category, MeasurementSystem, MeasurementType, MeasurementUnit, Theme } from '@/types/enum';

const path = '/v1/enum';

export async function getCategories(): Promise<CustomAxiosResponse<SuccessResponse<Category[]>>> {
  return axiosInstance.get(`${path}/categories`);
}

export async function getMeasurementSystems(): Promise<CustomAxiosResponse<SuccessResponse<MeasurementSystem[]>>> {
  return axiosInstance.get(`${path}/measurement-systems`);
}

export async function getMeasurementTypes(): Promise<CustomAxiosResponse<SuccessResponse<MeasurementType[]>>> {
  return axiosInstance.get(`${path}/measurement-types`);
}

export async function getMeasurementUnits(): Promise<CustomAxiosResponse<SuccessResponse<MeasurementUnit[]>>> {
  return axiosInstance.get(`${path}/measurement-units`);
}

export async function getThemes(): Promise<CustomAxiosResponse<SuccessResponse<Theme[]>>> {
  return axiosInstance.get(`${path}/themes`);
}
