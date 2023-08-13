/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '@/api/memberApi';
import { Member, MemberSettings, MemberState } from '@/types/member';
import handleAsyncThunk from '@/utils/api';

const initialState: MemberState = {
  error: null,
  loading: false,
  member: null
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
        state.loading = true;
      })
      .addCase(getMemberById.fulfilled, (state, action) => {
        state.member = action.payload;
        state.loading = false;
      })
      .addCase(getMemberById.rejected, (state, action) => {
        state.error = action.payload as string | null;
        state.loading = false;
      })
      .addCase(createMember.pending, (state) => {
        state.loading = true;
      })
      .addCase(createMember.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createMember.rejected, (state, action) => {
        state.error = action.payload as string | null;
        state.loading = false;
      })
      .addCase(updateMember.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMember.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateMember.rejected, (state, action) => {
        state.error = action.payload as string | null;
        state.loading = false;
      })
      .addCase(deleteMember.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteMember.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteMember.rejected, (state, action) => {
        state.error = action.payload as string | null;
        state.loading = false;
      })
      .addCase(updateMemberPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMemberPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateMemberPassword.rejected, (state, action) => {
        state.error = action.payload as string | null;
        state.loading = false;
      })
      .addCase(resetMemberPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetMemberPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetMemberPassword.rejected, (state, action) => {
        state.error = action.payload as string | null;
        state.loading = false;
      })
      .addCase(confirmResetMemberPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(confirmResetMemberPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(confirmResetMemberPassword.rejected, (state, action) => {
        state.error = action.payload as string | null;
        state.loading = false;
      })
      .addCase(loginMember.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginMember.fulfilled, (state, action) => {
        state.member = action.payload;
        state.loading = false;
      })
      .addCase(loginMember.rejected, (state, action) => {
        state.error = action.payload as string | null;
        state.loading = false;
      })
      .addCase(logoutMember.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutMember.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(logoutMember.rejected, (state, action) => {
        state.error = action.payload as string | null;
        state.loading = false;
      })
      .addCase(updateMemberSettings.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMemberSettings.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateMemberSettings.rejected, (state, action) => {
        state.error = action.payload as string | null;
        state.loading = false;
      });
  }
});

export default memberSlice.reducer;
