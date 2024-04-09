import { SliceItem } from '@/types/common';
import { Theme } from '@/types/enum';

export type MemberSettingsBase = {
  themeid: number;
  usepantry: boolean;
  usenegativepantry: boolean;
};

export type MemberSettingsRequest = MemberSettingsBase;

export type MemberSettingsResponse = MemberSettingsBase & {
  id: number;
  memberid: number;
  theme: Theme;
  createdat: string;
  editedat: string;
};

export type MemberBase = {
  firstname: string;
  lastname: string;
  emailaddress: string;
  password: string;
};

export type MemberRequest = MemberBase;

export type MemberResponse = MemberBase & {
  id: number;
  ispremium: boolean;
  membersettings: MemberSettingsResponse;
  createdat: string;
  editedat: string;
};

export type MemberState = {
  member: SliceItem<MemberResponse>;
};

export type CreateMemberData = {
  body: MemberRequest;
};

export type UpdateMemberData = {
  body: MemberRequest;
};

export type UpdateMemberPasswordData = {
  body: { currentPassword: string; newPassword: string };
};

export type ResetMemberPasswordData = {
  body: { emailAddress: string };
};

export type ConfirmResetMemberPasswordData = {
  token: string;
  body: { newPassword: string };
};

export type LoginMemberData = {
  body: { emailaddress: string; password: string };
};

export type UpdateMemberSettingsData = {
  body: MemberSettingsRequest;
};
