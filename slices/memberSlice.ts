/* eslint-disable no-param-reassign */
import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '@/api/memberApi';
import {
  ConfirmResetMemberPasswordData,
  CreateMemberData,
  LoginMemberData,
  Member,
  MemberState,
  ResetMemberPasswordData,
  UpdateMemberData,
  UpdateMemberPasswordData,
  UpdateMemberSettingsData
} from '@/types/member';
import { SuccessResponse } from '@/types/api';
import { SliceItem } from '@/types/common';
import { StatusTypes } from '@/constants/general';
import handleAsyncThunk from '@/utils/api';

const initialState: MemberState = {
  member: {
    error: null,
    status: StatusTypes.Fulfilled,
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
        theme: {
          id: 0,
          value: ''
        },
        measurementsystem: {
          id: 0,
          value: ''
        },
        usepantry: false,
        usenegativepantry: false,
        displaynutritionalinformation: false,
        createdat: '',
        editedat: ''
      },
      createdat: '',
      editedat: ''
    },
    totalCount: null
  }
};

export const getMember = createAsyncThunk(
  'member/getMember',
  async (_, thunkAPI): Promise<SuccessResponse<Member>> => handleAsyncThunk(thunkAPI, () => api.getMember())
);

export const createMember = createAsyncThunk(
  'member/createMember',
  async (data: CreateMemberData, thunkAPI): Promise<void> => handleAsyncThunk(thunkAPI, () => api.createMember(data))
);

export const updateMember = createAsyncThunk(
  'member/updateMember',
  async (data: UpdateMemberData, thunkAPI): Promise<void> => handleAsyncThunk(thunkAPI, () => api.updateMember(data))
);

export const deleteMember = createAsyncThunk(
  'member/deleteMember',
  async (_, thunkAPI): Promise<void> => handleAsyncThunk(thunkAPI, () => api.deleteMember())
);

export const updateMemberPassword = createAsyncThunk(
  'member/updateMemberPassword',
  async (data: UpdateMemberPasswordData, thunkAPI): Promise<void> =>
    handleAsyncThunk(thunkAPI, () => api.updateMemberPassword(data))
);

export const resetMemberPassword = createAsyncThunk(
  'member/resetMemberPassword',
  async (data: ResetMemberPasswordData, thunkAPI): Promise<void> =>
    handleAsyncThunk(thunkAPI, () => api.resetMemberPassword(data))
);

export const confirmResetMemberPassword = createAsyncThunk(
  'member/confirmResetMemberPassword',
  async (data: ConfirmResetMemberPasswordData, thunkAPI): Promise<void> =>
    handleAsyncThunk(thunkAPI, () => api.confirmResetMemberPassword(data))
);

export const loginMember = createAsyncThunk(
  'member/loginMember',
  async (data: LoginMemberData, thunkAPI): Promise<void> => handleAsyncThunk(thunkAPI, () => api.loginMember(data))
);

export const logoutMember = createAsyncThunk(
  'member/logoutMember',
  async (_, thunkAPI): Promise<void> => handleAsyncThunk(thunkAPI, () => api.logoutMember())
);

export const updateMemberSettings = createAsyncThunk(
  'member/updateMemberSettings',
  async (data: UpdateMemberSettingsData, thunkAPI): Promise<void> =>
    handleAsyncThunk(thunkAPI, () => api.updateMemberSettings(data))
);

const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMember.pending, (state) => {
      state.member.error = null;
      state.member.status = StatusTypes.Pending;
    });
    builder.addCase(getMember.fulfilled, (state, action) => {
      const { data } = action.payload as SuccessResponse<Member>;

      state.member.data = data;
      state.member.status = StatusTypes.Fulfilled;
    });
    builder.addCase(getMember.rejected, (state, action) => {
      state.member.error = action.payload as SerializedError;
      state.member.status = StatusTypes.Rejected;
    });
    builder.addCase(createMember.pending, (state) => {
      state.member.error = null;
      state.member.status = StatusTypes.Pending;
    });
    builder.addCase(createMember.fulfilled, (state) => {
      state.member.status = StatusTypes.Fulfilled;
    });
    builder.addCase(createMember.rejected, (state, action) => {
      state.member.error = action.payload as SerializedError;
      state.member.status = StatusTypes.Rejected;
    });
    builder.addCase(updateMember.pending, (state) => {
      state.member.error = null;
      state.member.status = StatusTypes.Pending;
    });
    builder.addCase(updateMember.fulfilled, (state) => {
      state.member.status = StatusTypes.Fulfilled;
    });
    builder.addCase(updateMember.rejected, (state, action) => {
      state.member.error = action.payload as SerializedError;
      state.member.status = StatusTypes.Rejected;
    });
    builder.addCase(deleteMember.pending, (state) => {
      state.member.error = null;
      state.member.status = StatusTypes.Pending;
    });
    builder.addCase(deleteMember.fulfilled, (state) => {
      state.member.status = StatusTypes.Fulfilled;
    });
    builder.addCase(deleteMember.rejected, (state, action) => {
      state.member.error = action.payload as SerializedError;
      state.member.status = StatusTypes.Rejected;
    });
    builder.addCase(updateMemberPassword.pending, (state) => {
      state.member.error = null;
      state.member.status = StatusTypes.Pending;
    });
    builder.addCase(updateMemberPassword.fulfilled, (state) => {
      state.member.status = StatusTypes.Fulfilled;
    });
    builder.addCase(updateMemberPassword.rejected, (state, action) => {
      state.member.error = action.payload as SerializedError;
      state.member.status = StatusTypes.Rejected;
    });
    builder.addCase(resetMemberPassword.pending, (state) => {
      state.member.error = null;
      state.member.status = StatusTypes.Pending;
    });
    builder.addCase(resetMemberPassword.fulfilled, (state) => {
      state.member.status = StatusTypes.Fulfilled;
    });
    builder.addCase(resetMemberPassword.rejected, (state, action) => {
      state.member.error = action.payload as SerializedError;
      state.member.status = StatusTypes.Rejected;
    });
    builder.addCase(confirmResetMemberPassword.pending, (state) => {
      state.member.error = null;
      state.member.status = StatusTypes.Pending;
    });
    builder.addCase(confirmResetMemberPassword.fulfilled, (state) => {
      state.member.status = StatusTypes.Fulfilled;
    });
    builder.addCase(confirmResetMemberPassword.rejected, (state, action) => {
      state.member.error = action.payload as SerializedError;
      state.member.status = StatusTypes.Rejected;
    });
    builder.addCase(loginMember.pending, (state) => {
      state.member.error = null;
      state.member.status = StatusTypes.Pending;
    });
    builder.addCase(loginMember.fulfilled, (state) => {
      state.member.status = StatusTypes.Fulfilled;
    });
    builder.addCase(loginMember.rejected, (state, action) => {
      state.member.error = action.payload as SerializedError;
      state.member.status = StatusTypes.Rejected;
    });
    builder.addCase(logoutMember.pending, (state) => {
      state.member.error = null;
      state.member.status = StatusTypes.Pending;
    });
    builder.addCase(logoutMember.fulfilled, (state) => {
      state.member.status = StatusTypes.Fulfilled;
    });
    builder.addCase(logoutMember.rejected, (state, action) => {
      state.member.error = action.payload as SerializedError;
      state.member.status = StatusTypes.Rejected;
    });
    builder.addCase(updateMemberSettings.pending, (state) => {
      state.member.error = null;
      state.member.status = StatusTypes.Pending;
    });
    builder.addCase(updateMemberSettings.fulfilled, (state) => {
      state.member.status = StatusTypes.Fulfilled;
    });
    builder.addCase(updateMemberSettings.rejected, (state, action) => {
      state.member.error = action.payload as SerializedError;
      state.member.status = StatusTypes.Rejected;
    });
  }
});

export function selectMember(state: MemberState): SliceItem<Member> {
  return state.member;
}

export default memberSlice.reducer;
