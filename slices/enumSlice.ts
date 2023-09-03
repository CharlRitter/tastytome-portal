/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '@/api/enumApi';
import { Category, EnumState, MeasurementSystem, MeasurementType, MeasurementUnit } from '@/types/enum';
import { OperationTypes, StatusTypes } from '@/constants/general';
import handleAsyncThunk from '@/utils/api';
import { Theme } from '@mui/material';

const initialState: EnumState = {
  categories: {
    error: null,
    status: StatusTypes.Fulfilled,
    operation: null,
    value: []
  },
  measurementsystems: {
    error: null,
    status: StatusTypes.Fulfilled,
    operation: null,
    value: []
  },
  measurementtypes: {
    error: null,
    status: StatusTypes.Fulfilled,
    operation: null,
    value: []
  },
  measurementunits: {
    error: null,
    status: StatusTypes.Fulfilled,
    operation: null,
    value: []
  },
  themes: {
    error: null,
    status: StatusTypes.Fulfilled,
    operation: null,
    value: []
  }
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
        state.categories.error = null;
        state.categories.status = StatusTypes.Pending;
        state.categories.operation = OperationTypes.Get;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories.value = action.payload;
        state.categories.status = StatusTypes.Fulfilled;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.categories.error = action.payload as string | null;
        state.categories.status = StatusTypes.Rejected;
      })
      .addCase(getMeasurementSystems.pending, (state) => {
        state.measurementsystems.error = null;
        state.measurementsystems.status = StatusTypes.Pending;
        state.measurementsystems.operation = OperationTypes.Get;
      })
      .addCase(getMeasurementSystems.fulfilled, (state, action) => {
        state.measurementsystems.value = action.payload;
        state.measurementsystems.status = StatusTypes.Fulfilled;
      })
      .addCase(getMeasurementSystems.rejected, (state, action) => {
        state.measurementsystems.error = action.payload as string | null;
        state.measurementsystems.status = StatusTypes.Rejected;
      })
      .addCase(getMeasurementTypes.pending, (state) => {
        state.measurementtypes.error = null;
        state.measurementtypes.status = StatusTypes.Pending;
        state.measurementtypes.operation = OperationTypes.Get;
      })
      .addCase(getMeasurementTypes.fulfilled, (state, action) => {
        state.measurementtypes.value = action.payload;
        state.measurementtypes.status = StatusTypes.Fulfilled;
      })
      .addCase(getMeasurementTypes.rejected, (state, action) => {
        state.measurementtypes.error = action.payload as string | null;
        state.measurementtypes.status = StatusTypes.Rejected;
      })
      .addCase(getMeasurementUnits.pending, (state) => {
        state.measurementunits.error = null;
        state.measurementunits.status = StatusTypes.Pending;
        state.measurementunits.operation = OperationTypes.Get;
      })
      .addCase(getMeasurementUnits.fulfilled, (state, action) => {
        state.measurementunits.value = action.payload;
        state.measurementunits.status = StatusTypes.Fulfilled;
      })
      .addCase(getMeasurementUnits.rejected, (state, action) => {
        state.measurementunits.error = action.payload as string | null;
        state.measurementunits.status = StatusTypes.Rejected;
      })
      .addCase(getThemes.pending, (state) => {
        state.themes.error = null;
        state.themes.status = StatusTypes.Pending;
        state.themes.operation = OperationTypes.Get;
      })
      .addCase(getThemes.fulfilled, (state, action) => {
        state.themes.value = action.payload;
        state.themes.status = StatusTypes.Fulfilled;
      })
      .addCase(getThemes.rejected, (state, action) => {
        state.themes.error = action.payload as string | null;
        state.themes.status = StatusTypes.Rejected;
      });
  }
});

export default enumSlice.reducer;
