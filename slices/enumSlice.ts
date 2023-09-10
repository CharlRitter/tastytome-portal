/* eslint-disable no-param-reassign */
import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '@/api/enumApi';
import { Category, EnumState, MeasurementSystem, MeasurementType, MeasurementUnit, Theme } from '@/types/enum';
import { SuccessResponse } from '@/types/api';
import { SliceItem } from '@/types/common';
import { StatusTypes } from '@/constants/general';
import handleAsyncThunk from '@/utils/api';

const initialState: EnumState = {
  categories: {
    error: null,
    status: StatusTypes.Fulfilled,
    data: [],
    totalCount: null
  },
  measurementsystems: {
    error: null,
    status: StatusTypes.Fulfilled,

    data: [],
    totalCount: null
  },
  measurementtypes: {
    error: null,
    status: StatusTypes.Fulfilled,
    data: [],
    totalCount: null
  },
  measurementunits: {
    error: null,
    status: StatusTypes.Fulfilled,
    data: [],
    totalCount: null
  },
  themes: {
    error: null,
    status: StatusTypes.Fulfilled,
    data: [],
    totalCount: null
  }
};

export const getCategories = createAsyncThunk(
  'enum/getCategories',
  async (_, thunkAPI): Promise<SuccessResponse<Category[]>> => handleAsyncThunk(thunkAPI, () => api.getCategories())
);

export const getMeasurementSystems = createAsyncThunk(
  'enum/getMeasurementSystems',
  async (_, thunkAPI): Promise<SuccessResponse<MeasurementSystem[]>> =>
    handleAsyncThunk(thunkAPI, () => api.getMeasurementSystems())
);

export const getMeasurementTypes = createAsyncThunk(
  'enum/getMeasurementTypes',
  async (_, thunkAPI): Promise<SuccessResponse<MeasurementType[]>> =>
    handleAsyncThunk(thunkAPI, () => api.getMeasurementTypes())
);

export const getMeasurementUnits = createAsyncThunk(
  'enum/getMeasurementUnits',
  async (_, thunkAPI): Promise<SuccessResponse<MeasurementUnit[]>> =>
    handleAsyncThunk(thunkAPI, () => api.getMeasurementUnits())
);

export const getThemes = createAsyncThunk(
  'enum/getThemes',
  async (_, thunkAPI): Promise<SuccessResponse<Theme[]>> => handleAsyncThunk(thunkAPI, () => api.getThemes())
);

const enumSlice = createSlice({
  name: 'enum',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.categories.error = null;
      state.categories.status = StatusTypes.Pending;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      const { data } = action.payload as SuccessResponse<Category[]>;

      state.categories.data = data;
      state.categories.status = StatusTypes.Fulfilled;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.categories.error = action.payload as SerializedError;
      state.categories.status = StatusTypes.Rejected;
    });
    builder.addCase(getMeasurementSystems.pending, (state) => {
      state.measurementsystems.error = null;
      state.measurementsystems.status = StatusTypes.Pending;
    });
    builder.addCase(getMeasurementSystems.fulfilled, (state, action) => {
      const { data } = action.payload as SuccessResponse<MeasurementSystem[]>;

      state.measurementsystems.data = data;
      state.measurementsystems.status = StatusTypes.Fulfilled;
    });
    builder.addCase(getMeasurementSystems.rejected, (state, action) => {
      state.measurementsystems.error = action.payload as SerializedError;
      state.measurementsystems.status = StatusTypes.Rejected;
    });
    builder.addCase(getMeasurementTypes.pending, (state) => {
      state.measurementtypes.error = null;
      state.measurementtypes.status = StatusTypes.Pending;
    });
    builder.addCase(getMeasurementTypes.fulfilled, (state, action) => {
      const { data } = action.payload as SuccessResponse<MeasurementType[]>;

      state.measurementtypes.data = data;
      state.measurementtypes.status = StatusTypes.Fulfilled;
    });
    builder.addCase(getMeasurementTypes.rejected, (state, action) => {
      state.measurementtypes.error = action.payload as SerializedError;
      state.measurementtypes.status = StatusTypes.Rejected;
    });
    builder.addCase(getMeasurementUnits.pending, (state) => {
      state.measurementunits.error = null;
      state.measurementunits.status = StatusTypes.Pending;
    });
    builder.addCase(getMeasurementUnits.fulfilled, (state, action) => {
      const { data } = action.payload as SuccessResponse<MeasurementUnit[]>;

      state.measurementunits.data = data;
      state.measurementunits.status = StatusTypes.Fulfilled;
    });
    builder.addCase(getMeasurementUnits.rejected, (state, action) => {
      state.measurementunits.error = action.payload as SerializedError;
      state.measurementunits.status = StatusTypes.Rejected;
    });
    builder.addCase(getThemes.pending, (state) => {
      state.themes.error = null;
      state.themes.status = StatusTypes.Pending;
    });
    builder.addCase(getThemes.fulfilled, (state, action) => {
      const { data } = action.payload as SuccessResponse<Theme[]>;

      state.themes.data = data;
      state.themes.status = StatusTypes.Fulfilled;
    });
    builder.addCase(getThemes.rejected, (state, action) => {
      state.themes.error = action.payload as SerializedError;
      state.themes.status = StatusTypes.Rejected;
    });
  }
});

export function selectCategories(state: EnumState): SliceItem<Category[]> {
  return state.categories;
}

export function selectMeasurementSystems(state: EnumState): SliceItem<MeasurementSystem[]> {
  return state.measurementsystems;
}

export function selectMeasurementTypes(state: EnumState): SliceItem<MeasurementType[]> {
  return state.measurementtypes;
}

export function selectMeasurementUnits(state: EnumState): SliceItem<MeasurementUnit[]> {
  return state.measurementunits;
}

export function selectThemes(state: EnumState): SliceItem<Theme[]> {
  return state.themes;
}

export default enumSlice.reducer;
