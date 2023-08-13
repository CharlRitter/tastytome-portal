/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '@/api/enumApi';
import { Category, EnumState, MeasurementSystem, MeasurementType, MeasurementUnit } from '@/types/enum';
import handleAsyncThunk from '@/utils/api';
import { Theme } from '@mui/material';

const initialState: EnumState = {
  error: null,
  loading: false,
  categories: [],
  measurementsystems: [],
  measurementtypes: [],
  measurementunits: [],
  themes: []
};

export const getCategories = createAsyncThunk(
  'enum/getCategories',
  async (_, thunkAPI): Promise<Category[]> => handleAsyncThunk(thunkAPI, () => api.getCategories())
);

export const getMeasurementSystems = createAsyncThunk(
  'enum/getMeasurementSystems',
  async (_, thunkAPI): Promise<MeasurementSystem[]> => handleAsyncThunk(thunkAPI, () => api.getMeasurementSystems())
);

export const getMeasurementTypes = createAsyncThunk(
  'enum/getMeasurementTypes',
  async (_, thunkAPI): Promise<MeasurementType[]> => handleAsyncThunk(thunkAPI, () => api.getMeasurementTypes())
);

export const getMeasurementUnits = createAsyncThunk(
  'enum/getMeasurementUnits',
  async (_, thunkAPI): Promise<MeasurementUnit[]> => handleAsyncThunk(thunkAPI, () => api.getMeasurementUnits())
);

export const getThemes = createAsyncThunk(
  'enum/getThemes',
  async (_, thunkAPI): Promise<Theme[]> => handleAsyncThunk(thunkAPI, () => api.getThemes())
);

const enumSlice = createSlice({
  name: 'enum',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.error = action.payload as string | null;
        state.loading = false;
      })
      .addCase(getMeasurementSystems.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMeasurementSystems.fulfilled, (state, action) => {
        state.measurementsystems = action.payload;
        state.loading = false;
      })
      .addCase(getMeasurementSystems.rejected, (state, action) => {
        state.error = action.payload as string | null;
        state.loading = false;
      })
      .addCase(getMeasurementTypes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMeasurementTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.measurementtypes = action.payload;
      })
      .addCase(getMeasurementTypes.rejected, (state, action) => {
        state.error = action.payload as string | null;
        state.loading = false;
      })
      .addCase(getMeasurementUnits.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMeasurementUnits.fulfilled, (state, action) => {
        state.loading = false;
        state.measurementunits = action.payload;
      })
      .addCase(getMeasurementUnits.rejected, (state, action) => {
        state.error = action.payload as string | null;
        state.loading = false;
      })
      .addCase(getThemes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getThemes.fulfilled, (state, action) => {
        state.loading = false;
        state.themes = action.payload;
      })
      .addCase(getThemes.rejected, (state, action) => {
        state.error = action.payload as string | null;
        state.loading = false;
      });
  }
});

export default enumSlice.reducer;
