import { AxiosResponse } from 'axios';
import axiosInstance from '@/api/axios';

const path = '/v1/enum';

export async function getCategories(): Promise<AxiosResponse> {
  return axiosInstance.get(`${path}/categories`);
}

export async function getMeasurementSystems(): Promise<AxiosResponse> {
  return axiosInstance.get(`${path}/measurement-systems`);
}

export async function getMeasurementTypes(): Promise<AxiosResponse> {
  return axiosInstance.get(`${path}/measurement-types`);
}

export async function getMeasurementUnits(): Promise<AxiosResponse> {
  return axiosInstance.get(`${path}/measurement-units`);
}

export async function getThemes(): Promise<AxiosResponse> {
  return axiosInstance.get(`${path}/themes`);
}
