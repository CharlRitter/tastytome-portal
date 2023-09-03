/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '@/api/memberApi';
import { Member, MemberSettings, MemberState } from '@/types/member';
import { OperationTypes, StatusTypes } from '@/constants/general';
import handleAsyncThunk from '@/utils/api';

const initialState: MemberState = {
  member: {
    error: null,
    status: StatusTypes.Fulfilled,
    operation: null,
    value: null
  }
};

export const getMemberById = createAsyncThunk(
  'member/getMemberById',
  async (id: number, thunkAPI): Promise<Member> => handleAsyncThunk(thunkAPI, () => api.getMemberById(id))
);

export const createMember = createAsyncThunk(
  'member/createMember',
  async (data: Member, thunkAPI): Promise<Member> => handleAsyncThunk(thunkAPI, () => api.createMember(data))
);

export const updateMember = createAsyncThunk(
  'member/updateMember',
  async ({ id, data }: { id: number; data: Member }, thunkAPI) => {
    handleAsyncThunk(thunkAPI, () => api.updateMember(id, data));

    thunkAPI.dispatch(getMemberById(id));
  }
);

export const deleteMember = createAsyncThunk(
  'member/deleteMember',
  async (id: number, thunkAPI): Promise<void> => handleAsyncThunk(thunkAPI, () => api.deleteMember(id))
);

export const updateMemberPassword = createAsyncThunk(
  'member/updateMemberPassword',
  async ({ id, data }: { id: number; data: { currentPassword: string; newPassword: string } }, thunkAPI) => {
    handleAsyncThunk(thunkAPI, () => api.updateMemberPassword(id, data));

    thunkAPI.dispatch(getMemberById(id));
  }
);

export const resetMemberPassword = createAsyncThunk(
  'member/resetMemberPassword',
  async (data: { emailAddress: string }, thunkAPI): Promise<void> =>
    handleAsyncThunk(thunkAPI, () => api.resetMemberPassword(data))
);

export const confirmResetMemberPassword = createAsyncThunk(
  'member/confirmResetMemberPassword',
  async (data: { token: string; newPassword: string }, thunkAPI): Promise<void> =>
    handleAsyncThunk(thunkAPI, () => api.confirmResetMemberPassword(data.token, { newPassword: data.newPassword }))
);

export const loginMember = createAsyncThunk(
  'member/loginMember',
  async (id: number, thunkAPI): Promise<Member> => handleAsyncThunk(thunkAPI, () => api.loginMember(id))
);

export const logoutMember = createAsyncThunk(
  'member/logoutMember',
  async (id: number, thunkAPI): Promise<Member> => handleAsyncThunk(thunkAPI, () => api.logoutMember(id))
);

export const updateMemberSettings = createAsyncThunk(
  'member/updateMemberSettings',
  async ({ id, memberId, data }: { id: number; memberId: number; data: MemberSettings }, thunkAPI) => {
    handleAsyncThunk(thunkAPI, () => api.updateMemberSettings(id, data));

    thunkAPI.dispatch(getMemberById(memberId));
  }
);

const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMemberById.pending, (state) => {
        state.member.error = null;
        state.member.status = StatusTypes.Pending;
        state.member.operation = OperationTypes.Get;
      })
      .addCase(getMemberById.fulfilled, (state, action) => {
        state.member.value = action.payload;
        state.member.status = StatusTypes.Fulfilled;
      })
      .addCase(getMemberById.rejected, (state, action) => {
        state.member.error = action.payload as string | null;
        state.member.status = StatusTypes.Rejected;
      })
      .addCase(createMember.pending, (state) => {
        state.member.error = null;
        state.member.status = StatusTypes.Pending;
        state.member.operation = OperationTypes.Create;
      })
      .addCase(createMember.fulfilled, (state) => {
        state.member.status = StatusTypes.Fulfilled;
      })
      .addCase(createMember.rejected, (state, action) => {
        state.member.error = action.payload as string | null;
        state.member.status = StatusTypes.Rejected;
      })
      .addCase(updateMember.pending, (state) => {
        state.member.error = null;
        state.member.status = StatusTypes.Pending;
        state.member.operation = OperationTypes.Get;
      })
      .addCase(updateMember.fulfilled, (state) => {
        state.member.status = StatusTypes.Fulfilled;
      })
      .addCase(updateMember.rejected, (state, action) => {
        state.member.error = action.payload as string | null;
        state.member.status = StatusTypes.Rejected;
      })
      .addCase(deleteMember.pending, (state) => {
        state.member.error = null;
        state.member.status = StatusTypes.Pending;
        state.member.operation = OperationTypes.Delete;
      })
      .addCase(deleteMember.fulfilled, (state) => {
        state.member.status = StatusTypes.Fulfilled;
      })
      .addCase(deleteMember.rejected, (state, action) => {
        state.member.error = action.payload as string | null;
        state.member.status = StatusTypes.Rejected;
      })
      .addCase(updateMemberPassword.pending, (state) => {
        state.member.error = null;
        state.member.status = StatusTypes.Pending;
        state.member.operation = OperationTypes.Update;
      })
      .addCase(updateMemberPassword.fulfilled, (state) => {
        state.member.status = StatusTypes.Fulfilled;
      })
      .addCase(updateMemberPassword.rejected, (state, action) => {
        state.member.error = action.payload as string | null;
        state.member.status = StatusTypes.Rejected;
      })
      .addCase(resetMemberPassword.pending, (state) => {
        state.member.error = null;
        state.member.status = StatusTypes.Pending;
        state.member.operation = OperationTypes.Update;
      })
      .addCase(resetMemberPassword.fulfilled, (state) => {
        state.member.status = StatusTypes.Fulfilled;
      })
      .addCase(resetMemberPassword.rejected, (state, action) => {
        state.member.error = action.payload as string | null;
        state.member.status = StatusTypes.Rejected;
      })
      .addCase(confirmResetMemberPassword.pending, (state) => {
        state.member.error = null;
        state.member.status = StatusTypes.Pending;
        state.member.operation = OperationTypes.Update;
      })
      .addCase(confirmResetMemberPassword.fulfilled, (state) => {
        state.member.status = StatusTypes.Fulfilled;
      })
      .addCase(confirmResetMemberPassword.rejected, (state, action) => {
        state.member.error = action.payload as string | null;
        state.member.status = StatusTypes.Rejected;
      })
      .addCase(loginMember.pending, (state) => {
        state.member.error = null;
        state.member.status = StatusTypes.Pending;
        state.member.operation = OperationTypes.Get;
      })
      .addCase(loginMember.fulfilled, (state, action) => {
        state.member.value = action.payload;
        state.member.status = StatusTypes.Rejected;
      })
      .addCase(loginMember.rejected, (state, action) => {
        state.member.error = action.payload as string | null;
        state.member.status = StatusTypes.Rejected;
      })
      .addCase(logoutMember.pending, (state) => {
        state.member.error = null;
        state.member.status = StatusTypes.Pending;
        state.member.operation = OperationTypes.Update;
      })
      .addCase(logoutMember.fulfilled, (state) => {
        state.member.status = StatusTypes.Fulfilled;
      })
      .addCase(logoutMember.rejected, (state, action) => {
        state.member.error = action.payload as string | null;
        state.member.status = StatusTypes.Rejected;
      })
      .addCase(updateMemberSettings.pending, (state) => {
        state.member.error = null;
        state.member.status = StatusTypes.Pending;
        state.member.operation = OperationTypes.Update;
      })
      .addCase(updateMemberSettings.fulfilled, (state) => {
        state.member.status = StatusTypes.Fulfilled;
      })
      .addCase(updateMemberSettings.rejected, (state, action) => {
        state.member.error = action.payload as string | null;
        state.member.status = StatusTypes.Rejected;
      });
  }
});

export default memberSlice.reducer;
