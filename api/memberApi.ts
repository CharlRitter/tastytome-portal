import { CustomAxiosResponse, axiosInstance } from '@/api/axios';
import { SuccessResponse } from '@/types/api';
import {
  ConfirmResetMemberPasswordData,
  CreateMemberData,
  LoginMemberData,
  MemberResponse,
  ResetMemberPasswordData,
  UpdateMemberData,
  UpdateMemberPasswordData,
  UpdateMemberSettingsData
} from '@/types/member';

const path = '/v1/member';

export async function getMember(): Promise<CustomAxiosResponse<SuccessResponse<MemberResponse>>> {
  return axiosInstance.get(path);
}

export async function createMember(data: CreateMemberData): Promise<CustomAxiosResponse<void>> {
  const { body } = data;

  return axiosInstance.post(path, body);
}

export async function updateMember(data: UpdateMemberData): Promise<CustomAxiosResponse<void>> {
  const { body } = data;

  return axiosInstance.put(path, body);
}

export async function deleteMember(): Promise<CustomAxiosResponse<void>> {
  return axiosInstance.delete(path);
}

export async function updateMemberPassword(data: UpdateMemberPasswordData): Promise<CustomAxiosResponse<void>> {
  const { body } = data;

  return axiosInstance.put(`${path}/password/update`, body);
}

export async function resetMemberPassword(data: ResetMemberPasswordData): Promise<CustomAxiosResponse<void>> {
  const { body } = data;

  return axiosInstance.put(`${path}/password/reset`, body);
}

export async function confirmResetMemberPassword(data: ConfirmResetMemberPasswordData): Promise<CustomAxiosResponse<void>> {
  const { token, body } = data;

  return axiosInstance.put(`${path}/password/reset/${token}`, body);
}

export async function loginMember(data: LoginMemberData): Promise<CustomAxiosResponse<void>> {
  const { body } = data;

  return axiosInstance.post(`${path}/login`, body);
}

export async function logoutMember(): Promise<CustomAxiosResponse<void>> {
  return axiosInstance.post(`${path}/logout`);
}

export async function updateMemberSettings(data: UpdateMemberSettingsData): Promise<CustomAxiosResponse<void>> {
  const { body } = data;

  return axiosInstance.put(`${path}/settings`, body);
}
