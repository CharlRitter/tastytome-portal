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
  member: SliceItem<Member | null>;
}
