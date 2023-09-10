import { MeasurementSystem, Theme } from '@/types/enum';
import { SliceItem } from '@/types/common';

export interface MemberSettings {
  id: number;
  memberid: number;
  theme: Theme;
  measurementsystem: MeasurementSystem;
  usepantry: boolean;
  usenegativepantry: boolean;
  displaynutritionalinformation: boolean;
  createdat: string;
  editedat: string;
}

export interface Member {
  id: number;
  firstname: string;
  lastname: string;
  emailaddress: string;
  password: string;
  ispremium: boolean;
  membersettings: MemberSettings;
  createdat: string;
  editedat: string;
}

export interface MemberState {
  member: SliceItem<Member>;
}

export interface CreateMemberData {
  body: Member;
}

export interface UpdateMemberData {
  body: Member;
}

export interface UpdateMemberPasswordData {
  body: { currentPassword: string; newPassword: string };
}

export interface ResetMemberPasswordData {
  body: { emailAddress: string };
}

export interface ConfirmResetMemberPasswordData {
  token: string;
  body: { newPassword: string };
}

export interface LoginMemberData {
  body: { emailaddress: string; password: string };
}

export interface UpdateMemberSettingsData {
  body: MemberSettings;
}
