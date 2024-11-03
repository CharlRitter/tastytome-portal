import { AxiosResponse, axiosInstance } from '@/api/axios';
import { SuccessResponse } from '@/types/api';
import { Category, MeasurementSystem, MeasurementType, MeasurementUnit, Theme } from '@/types/enum';

const path = '/v1/enum';

export async function getCategories(): Promise<AxiosResponse<SuccessResponse<Category[]>>> {
  return axiosInstance.get(`${path}/categories`);
}

export async function getMeasurementSystems(): Promise<AxiosResponse<SuccessResponse<MeasurementSystem[]>>> {
  return axiosInstance.get(`${path}/measurement-systems`);
}

export async function getMeasurementTypes(): Promise<AxiosResponse<SuccessResponse<MeasurementType[]>>> {
  return axiosInstance.get(`${path}/measurement-types`);
}

export async function getMeasurementUnits(): Promise<AxiosResponse<SuccessResponse<MeasurementUnit[]>>> {
  return axiosInstance.get(`${path}/measurement-units`);
}

export async function getThemes(): Promise<AxiosResponse<SuccessResponse<Theme[]>>> {
  return axiosInstance.get(`${path}/themes`);
}
