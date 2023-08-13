import { AxiosResponse } from 'axios';
import axiosInstance from '@/api/axios';
import { Member, MemberSettings } from '@/types/member';

const path = '/v1/member';

export async function getMemberById(id: number): Promise<AxiosResponse> {
  return axiosInstance.get(`${path}/${id}`);
}

export async function createMember(data: Member): Promise<AxiosResponse> {
  return axiosInstance.post(path, data);
}

export async function updateMember(id: number, data: Member): Promise<AxiosResponse> {
  return axiosInstance.put(`${path}/${id}`, data);
}

export async function deleteMember(id: number): Promise<AxiosResponse> {
  return axiosInstance.delete(`${path}/${id}`);
}

export async function updateMemberPassword(
  id: number,
  data: { currentPassword: string; newPassword: string }
): Promise<AxiosResponse> {
  return axiosInstance.put(`${path}/password/update/${id}`, data);
}

export async function resetMemberPassword(data: { emailAddress: string }): Promise<AxiosResponse> {
  return axiosInstance.put(`${path}/password/reset`, data);
}

export async function confirmResetMemberPassword(token: string, data: { newPassword: string }): Promise<AxiosResponse> {
  return axiosInstance.put(`${path}/password/reset/${token}`, data);
}

export async function loginMember(id: number): Promise<AxiosResponse> {
  return axiosInstance.post(`${path}/login/${id}`);
}

export async function logoutMember(id: number): Promise<AxiosResponse> {
  return axiosInstance.post(`${path}/logout/${id}`);
}

export async function updateMemberSettings(id: number, data: MemberSettings): Promise<AxiosResponse> {
  return axiosInstance.put(`${path}/settings/${id}`, data);
}
