/* eslint-disable no-param-reassign */
import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as api from '@/api/memberApi';
import { StatusTypes } from '@/constants/general';
import { SuccessResponse } from '@/types/api';
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
  SuccessResponse<MemberResponse>,
  void,
  {
    rejectValue: SerializedError;
  }
>('member/getMember', async (_, thunkAPI) => {
  try {
    const response = await withJWTSessionStorage(api.getMember());

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.response?.data ?? { message: 'Something went wrong' });
  }
});

export const createMember = createAsyncThunk<
  void,
  CreateMemberData,
  {
    rejectValue: SerializedError;
  }
>('member/createMember', async (data, thunkAPI) => {
  try {
    const response = await api.createMember(data);

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.response?.data ?? { message: 'Something went wrong' });
  }
});

export const updateMember = createAsyncThunk<
  void,
  UpdateMemberData,
  {
    rejectValue: SerializedError;
  }
>('member/updateMember', async (data, thunkAPI) => {
  try {
    const response = await withJWTSessionStorage(api.updateMember(data));

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.response?.data ?? { message: 'Something went wrong' });
  }
});

export const deleteMember = createAsyncThunk<
  void,
  void,
  {
    rejectValue: SerializedError;
  }
>('member/deleteMember', async (_, thunkAPI) => {
  try {
    const response = await withJWTSessionStorage(api.deleteMember());

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.response?.data ?? { message: 'Something went wrong' });
  }
});

export const updateMemberPassword = createAsyncThunk<
  void,
  UpdateMemberPasswordData,
  {
    rejectValue: SerializedError;
  }
>('member/updateMemberPassword', async (data, thunkAPI) => {
  try {
    const response = await withJWTSessionStorage(api.updateMemberPassword(data));

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.response?.data ?? { message: 'Something went wrong' });
  }
});

export const resetMemberPassword = createAsyncThunk<
  void,
  ResetMemberPasswordData,
  {
    rejectValue: SerializedError;
  }
>('member/resetMemberPassword', async (data, thunkAPI) => {
  try {
    const response = await api.resetMemberPassword(data);

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.response?.data ?? { message: 'Something went wrong' });
  }
});

export const confirmResetMemberPassword = createAsyncThunk<
  void,
  ConfirmResetMemberPasswordData,
  {
    rejectValue: SerializedError;
  }
>('member/confirmResetMemberPassword', async (data, thunkAPI) => {
  try {
    const response = await api.confirmResetMemberPassword(data);

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.response?.data ?? { message: 'Something went wrong' });
  }
});

export const loginMember = createAsyncThunk<
  void,
  LoginMemberData,
  {
    rejectValue: SerializedError;
  }
>('member/loginMember', async (data, thunkAPI) => {
  try {
    const response = await withJWTSessionStorage(api.loginMember(data));

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.response?.data ?? { message: 'Something went wrong' });
  }
});

export const logoutMember = createAsyncThunk<
  void,
  void,
  {
    rejectValue: SerializedError;
  }
>('member/logoutMember', async (_, thunkAPI) => {
  try {
    const response = await withJWTSessionStorage(api.logoutMember());

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.response?.data ?? { message: 'Something went wrong' });
  }
});

export const updateMemberSettings = createAsyncThunk<
  void,
  UpdateMemberSettingsData,
  {
    rejectValue: SerializedError;
  }
>('member/updateMemberSettings', async (data, thunkAPI) => {
  try {
    const response = await withJWTSessionStorage(api.updateMemberSettings(data));

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.response?.data ?? { message: 'Something went wrong' });
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
      const { data } = action.payload;

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
