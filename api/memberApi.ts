import { AxiosResponse, axiosInstance } from '@/api/axios';
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

export async function getMember(): Promise<AxiosResponse<SuccessResponse<MemberResponse>>> {
  return axiosInstance.get(path);
}

export async function createMember(data: CreateMemberData): Promise<AxiosResponse<SuccessResponse<void>>> {
  const { body } = data;

  return axiosInstance.post(path, body);
}

export async function updateMember(data: UpdateMemberData): Promise<AxiosResponse<SuccessResponse<void>>> {
  const { body } = data;

  return axiosInstance.put(path, body);
}

export async function deleteMember(): Promise<AxiosResponse<SuccessResponse<void>>> {
  return axiosInstance.delete(path);
}

export async function updateMemberPassword(data: UpdateMemberPasswordData): Promise<AxiosResponse<SuccessResponse<void>>> {
  const { body } = data;

  return axiosInstance.put(`${path}/password/update`, body);
}

export async function resetMemberPassword(data: ResetMemberPasswordData): Promise<AxiosResponse<SuccessResponse<void>>> {
  const { body } = data;

  return axiosInstance.put(`${path}/password/reset`, body);
}

export async function confirmResetMemberPassword(data: ConfirmResetMemberPasswordData): Promise<AxiosResponse<SuccessResponse<void>>> {
  const { token, body } = data;

  return axiosInstance.put(`${path}/password/reset/${token}`, body);
}

export async function loginMember(data: LoginMemberData): Promise<AxiosResponse<SuccessResponse<void>>> {
  const { body } = data;

  return axiosInstance.post(`${path}/login`, body);
}

export async function logoutMember(): Promise<AxiosResponse<SuccessResponse<void>>> {
  return axiosInstance.post(`${path}/logout`);
}

export async function updateMemberSettings(data: UpdateMemberSettingsData): Promise<AxiosResponse<SuccessResponse<void>>> {
  const { body } = data;

  return axiosInstance.put(`${path}/settings`, body);
}
