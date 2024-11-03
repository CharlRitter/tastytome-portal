import { createSlice } from '@reduxjs/toolkit';

import * as api from '@/api/memberApi';
import {
  ConfirmResetMemberPasswordData,
  CreateMemberData,
  LoginMemberData,
  MemberResponse,
  MemberState,
  ResetMemberPasswordData,
  UpdateMemberData,
  UpdateMemberPasswordData,
  UpdateMemberSettingsData
} from '@/types/member';
import { createThunk, withJWTSessionStorage } from '@/utils/common';

const initialState: MemberState = {
  member: {
    data: {
      id: 0,
      firstname: '',
      lastname: '',
      emailaddress: '',
      password: '',
      ispremium: false,
      membersettings: {
        id: 0,
        memberid: 0,
        themeid: 0,
        theme: {
          id: 0,
          value: ''
        },
        usepantry: false,
        usenegativepantry: false,
        createdat: '',
        editedat: ''
      },
      createdat: '',
      editedat: ''
    }
  }
};

export const getMember = createThunk<MemberResponse>(() => api.getMember(), 'member/getMember');
export const createMember = createThunk<void, CreateMemberData>(
  (data) => api.createMember(data),
  'member/createMember'
);
export const updateMember = createThunk<void, UpdateMemberData>(
  (data) => withJWTSessionStorage(api.updateMember(data)),
  'member/updateMember'
);
export const deleteMember = createThunk<void>(() => withJWTSessionStorage(api.deleteMember()), 'member/deleteMember');
export const updateMemberPassword = createThunk<void, UpdateMemberPasswordData>(
  (data) => withJWTSessionStorage(api.updateMemberPassword(data)),
  'member/updateMemberPassword'
);
export const resetMemberPassword = createThunk<void, ResetMemberPasswordData>(
  (data) => api.resetMemberPassword(data),
  'member/resetMemberPassword'
);
export const confirmResetMemberPassword = createThunk<void, ConfirmResetMemberPasswordData>(
  (data) => api.confirmResetMemberPassword(data),
  'member/confirmResetMemberPassword'
);
export const loginMember = createThunk<void, LoginMemberData>(
  (data) => withJWTSessionStorage(api.loginMember(data)),
  'member/loginMember'
);
export const logoutMember = createThunk(() => withJWTSessionStorage(api.logoutMember()), 'member/logoutMember');
export const updateMemberSettings = createThunk<void, UpdateMemberSettingsData>(
  (data) => withJWTSessionStorage(api.updateMemberSettings(data)),
  'member/updateMemberSettings'
);

const memberSlice = createSlice({
  name: 'memberSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMember.fulfilled, (state, action) => {
      const { data } = action.payload.data;

      state.member.data = data;
    });
  }
});

export const memberReducer = memberSlice.reducer;
