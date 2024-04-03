/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AxiosResponse } from '@/api/axios';
import * as api from '@/api/memberApi';
import { StatusTypes } from '@/constants/general';
import { CustomSerializedError, SuccessResponse } from '@/types/api';
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
import { withJWTSessionStorage } from '@/utils/common';

const initialState: MemberState = {
  member: {
    error: {},
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
        themeid: 0,
        theme: {
          id: 0,
          value: ''
        },
        measurementsystemid: 0,
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
    }
  }
};

export const getMember = createAsyncThunk<
  AxiosResponse<SuccessResponse<MemberResponse>>,
  AxiosResponse<void>,
  { rejectValue: CustomSerializedError }
>('member/getMember', async (_, thunkAPI) => {
  try {
    return await withJWTSessionStorage(api.getMember());
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      { status: error?.response.status, ...error?.response?.data } ?? { message: 'Something went wrong', status: 500 }
    );
  }
});

export const createMember = createAsyncThunk<
  AxiosResponse<void>,
  CreateMemberData,
  { rejectValue: CustomSerializedError }
>('member/createMember', async (data, thunkAPI) => {
  try {
    return await api.createMember(data);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      { status: error?.response.status, ...error?.response?.data } ?? { message: 'Something went wrong', status: 500 }
    );
  }
});

export const updateMember = createAsyncThunk<
  AxiosResponse<void>,
  UpdateMemberData,
  { rejectValue: CustomSerializedError }
>('member/updateMember', async (data, thunkAPI) => {
  try {
    return await withJWTSessionStorage(api.updateMember(data));
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      { status: error?.response.status, ...error?.response?.data } ?? { message: 'Something went wrong', status: 500 }
    );
  }
});

export const deleteMember = createAsyncThunk<
  AxiosResponse<void>,
  AxiosResponse<void>,
  { rejectValue: CustomSerializedError }
>('member/deleteMember', async (_, thunkAPI) => {
  try {
    return await withJWTSessionStorage(api.deleteMember());
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      { status: error?.response.status, ...error?.response?.data } ?? { message: 'Something went wrong', status: 500 }
    );
  }
});

export const updateMemberPassword = createAsyncThunk<
  AxiosResponse<void>,
  UpdateMemberPasswordData,
  { rejectValue: CustomSerializedError }
>('member/updateMemberPassword', async (data, thunkAPI) => {
  try {
    return await withJWTSessionStorage(api.updateMemberPassword(data));
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      { status: error?.response.status, ...error?.response?.data } ?? { message: 'Something went wrong', status: 500 }
    );
  }
});

export const resetMemberPassword = createAsyncThunk<
  AxiosResponse<void>,
  ResetMemberPasswordData,
  { rejectValue: CustomSerializedError }
>('member/resetMemberPassword', async (data, thunkAPI) => {
  try {
    return await api.resetMemberPassword(data);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      { status: error?.response.status, ...error?.response?.data } ?? { message: 'Something went wrong', status: 500 }
    );
  }
});

export const confirmResetMemberPassword = createAsyncThunk<
  AxiosResponse<void>,
  ConfirmResetMemberPasswordData,
  { rejectValue: CustomSerializedError }
>('member/confirmResetMemberPassword', async (data, thunkAPI) => {
  try {
    return await api.confirmResetMemberPassword(data);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      { status: error?.response.status, ...error?.response?.data } ?? { message: 'Something went wrong', status: 500 }
    );
  }
});

export const loginMember = createAsyncThunk<
  AxiosResponse<void>,
  LoginMemberData,
  { rejectValue: CustomSerializedError }
>('member/loginMember', async (data, thunkAPI) => {
  try {
    return await withJWTSessionStorage(api.loginMember(data));
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      { status: error?.response.status, ...error?.response?.data } ?? { message: 'Something went wrong', status: 500 }
    );
  }
});

export const logoutMember = createAsyncThunk<
  AxiosResponse<void>,
  AxiosResponse<void>,
  { rejectValue: CustomSerializedError }
>('member/logoutMember', async (_, thunkAPI) => {
  try {
    return await withJWTSessionStorage(api.logoutMember());
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      { status: error?.response.status, ...error?.response?.data } ?? { message: 'Something went wrong', status: 500 }
    );
  }
});

export const updateMemberSettings = createAsyncThunk<
  AxiosResponse<void>,
  UpdateMemberSettingsData,
  { rejectValue: CustomSerializedError }
>('member/updateMemberSettings', async (data, thunkAPI) => {
  try {
    return await withJWTSessionStorage(api.updateMemberSettings(data));
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      { status: error?.response.status, ...error?.response?.data } ?? { message: 'Something went wrong', status: 500 }
    );
  }
});

const memberSlice = createSlice({
  name: 'memberSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMember.pending, (state) => {
      state.member.error = {};
      state.member.status = StatusTypes.Pending;
    });
    builder.addCase(getMember.fulfilled, (state, action) => {
      const {
        data: { data }
      } = action.payload;

      state.member.data = data;
      state.member.status = StatusTypes.Fulfilled;
    });
    builder.addCase(getMember.rejected, (state, action) => {
      if (action.payload) {
        state.member.error = action.payload;
        state.member.error.message = `Error while retrieving member - ${action.payload.message}`;
      }
      state.member.status = StatusTypes.Rejected;
    });
    builder.addCase(createMember.pending, (state) => {
      state.member.error = {};
      state.member.status = StatusTypes.Pending;
    });
    builder.addCase(createMember.fulfilled, (state) => {
      state.member.status = StatusTypes.Fulfilled;
    });
    builder.addCase(createMember.rejected, (state, action) => {
      if (action.payload) {
        state.member.error = action.payload;
        state.member.error.message = `Error while adding member - ${action.payload.message}`;
      }
      state.member.status = StatusTypes.Rejected;
    });
    builder.addCase(updateMember.pending, (state) => {
      state.member.error = {};
      state.member.status = StatusTypes.Pending;
    });
    builder.addCase(updateMember.fulfilled, (state) => {
      state.member.status = StatusTypes.Fulfilled;
    });
    builder.addCase(updateMember.rejected, (state, action) => {
      if (action.payload) {
        state.member.error = action.payload;
        state.member.error.message = `Error while updating member - ${action.payload.message}`;
      }
      state.member.status = StatusTypes.Rejected;
    });
    builder.addCase(deleteMember.pending, (state) => {
      state.member.error = {};
      state.member.status = StatusTypes.Pending;
    });
    builder.addCase(deleteMember.fulfilled, (state) => {
      state.member.status = StatusTypes.Fulfilled;
    });
    builder.addCase(deleteMember.rejected, (state, action) => {
      if (action.payload) {
        state.member.error = action.payload;
        state.member.error.message = `Error while deleting member - ${action.payload.message}`;
      }
      state.member.status = StatusTypes.Rejected;
    });
    builder.addCase(updateMemberPassword.pending, (state) => {
      state.member.error = {};
      state.member.status = StatusTypes.Pending;
    });
    builder.addCase(updateMemberPassword.fulfilled, (state) => {
      state.member.status = StatusTypes.Fulfilled;
    });
    builder.addCase(updateMemberPassword.rejected, (state, action) => {
      if (action.payload) {
        state.member.error = action.payload;
        state.member.error.message = `Error while updating password - ${action.payload.message}`;
      }
      state.member.status = StatusTypes.Rejected;
    });
    builder.addCase(resetMemberPassword.pending, (state) => {
      state.member.error = {};
      state.member.status = StatusTypes.Pending;
    });
    builder.addCase(resetMemberPassword.fulfilled, (state) => {
      state.member.status = StatusTypes.Fulfilled;
    });
    builder.addCase(resetMemberPassword.rejected, (state, action) => {
      if (action.payload) {
        state.member.error = action.payload;
        state.member.error.message = `Error while resetting password - ${action.payload.message}`;
      }
      state.member.status = StatusTypes.Rejected;
    });
    builder.addCase(confirmResetMemberPassword.pending, (state) => {
      state.member.error = {};
      state.member.status = StatusTypes.Pending;
    });
    builder.addCase(confirmResetMemberPassword.fulfilled, (state) => {
      state.member.status = StatusTypes.Fulfilled;
    });
    builder.addCase(confirmResetMemberPassword.rejected, (state, action) => {
      if (action.payload) {
        state.member.error = action.payload;
        state.member.error.message = `Error while confirming password reset - ${action.payload.message}`;
      }
      state.member.status = StatusTypes.Rejected;
    });
    builder.addCase(loginMember.pending, (state) => {
      state.member.error = {};
      state.member.status = StatusTypes.Pending;
    });
    builder.addCase(loginMember.fulfilled, (state) => {
      state.member.status = StatusTypes.Fulfilled;
    });
    builder.addCase(loginMember.rejected, (state, action) => {
      if (action.payload) {
        state.member.error = action.payload;
        state.member.error.message = `Error during login - ${action.payload.message}`;
      }
      state.member.status = StatusTypes.Rejected;
    });
    builder.addCase(logoutMember.pending, (state) => {
      state.member.error = {};
      state.member.status = StatusTypes.Pending;
    });
    builder.addCase(logoutMember.fulfilled, (state) => {
      state.member.status = StatusTypes.Fulfilled;
    });
    builder.addCase(logoutMember.rejected, (state, action) => {
      if (action.payload) {
        state.member.error = action.payload;
        state.member.error.message = `Error during logout - ${action.payload.message}`;
      }
      state.member.status = StatusTypes.Rejected;
    });
    builder.addCase(updateMemberSettings.pending, (state) => {
      state.member.error = {};
      state.member.status = StatusTypes.Pending;
    });
    builder.addCase(updateMemberSettings.fulfilled, (state) => {
      state.member.status = StatusTypes.Fulfilled;
    });
    builder.addCase(updateMemberSettings.rejected, (state, action) => {
      if (action.payload) {
        state.member.error = action.payload;
        state.member.error.message = `Error while updating member settings - ${action.payload.message}`;
      }
      state.member.status = StatusTypes.Rejected;
    });
  }
});

export const memberReducer = memberSlice.reducer;
