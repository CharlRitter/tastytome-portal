/* eslint-disable no-param-reassign */
import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as api from '@/api/enumApi';
import { StatusTypes } from '@/constants/general';
import { SuccessResponse } from '@/types/api';
import { SliceItem } from '@/types/common';
import { Category, EnumState, MeasurementSystem, MeasurementType, MeasurementUnit, Theme } from '@/types/enum';

const initialState: EnumState = {
  categories: {
    error: {},
    status: StatusTypes.Fulfilled,
    data: []
  },
  measurementsystems: {
    error: {},
    status: StatusTypes.Fulfilled,
    data: []
  },
  measurementtypes: {
    error: {},
    status: StatusTypes.Fulfilled,
    data: []
  },
  measurementunits: {
    error: {},
    status: StatusTypes.Fulfilled,
    data: []
  },
  themes: {
    error: {},
    status: StatusTypes.Fulfilled,
    data: []
  }
};

export const getCategories = createAsyncThunk<
  SuccessResponse<Category[]>,
  void,
  {
    rejectValue: SerializedError;
  }
>('enum/getCategories', async (_, thunkAPI) => {
  try {
    const response = await api.getCategories();

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.response?.data ?? { message: 'Something went wrong' });
  }
});

export const getMeasurementSystems = createAsyncThunk<
  SuccessResponse<MeasurementSystem[]>,
  void,
  {
    rejectValue: SerializedError;
  }
>('enum/getMeasurementSystems', async (_, thunkAPI) => {
  try {
    const response = await api.getMeasurementSystems();

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.response?.data ?? { message: 'Something went wrong' });
  }
});

export const getMeasurementTypes = createAsyncThunk<
  SuccessResponse<MeasurementType[]>,
  void,
  {
    rejectValue: SerializedError;
  }
>('enum/getMeasurementTypes', async (_, thunkAPI) => {
  try {
    const response = await api.getMeasurementTypes();

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.response?.data ?? { message: 'Something went wrong' });
  }
});

export const getMeasurementUnits = createAsyncThunk<
  SuccessResponse<MeasurementUnit[]>,
  void,
  {
    rejectValue: SerializedError;
  }
>('enum/getMeasurementUnits', async (_, thunkAPI) => {
  try {
    const response = await api.getMeasurementUnits();

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.response?.data ?? { message: 'Something went wrong' });
  }
});

export const getThemes = createAsyncThunk<
  SuccessResponse<Theme[]>,
  void,
  {
    rejectValue: SerializedError;
  }
>('enum/getThemes', async (_, thunkAPI) => {
  try {
    const response = await api.getThemes();

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.response?.data ?? { message: 'Something went wrong' });
  }
});

const enumSlice = createSlice({
  name: 'enumSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.categories.error = {};
      state.categories.status = StatusTypes.Pending;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      const { data } = action.payload;

      state.categories.data = data;
      state.categories.status = StatusTypes.Fulfilled;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      if (action.payload) {
        state.categories.error = action.payload;
        state.categories.error.message = `Error while retrieving categories - ${action.payload.message}`;
      }
      state.categories.status = StatusTypes.Rejected;
    });
    builder.addCase(getMeasurementSystems.pending, (state) => {
      state.measurementsystems.error = {};
      state.measurementsystems.status = StatusTypes.Pending;
    });
    builder.addCase(getMeasurementSystems.fulfilled, (state, action) => {
      const { data } = action.payload;

      state.measurementsystems.data = data;
      state.measurementsystems.status = StatusTypes.Fulfilled;
    });
    builder.addCase(getMeasurementSystems.rejected, (state, action) => {
      if (action.payload) {
        state.measurementsystems.error = action.payload;
        state.measurementsystems.error.message = `Error while retrieving measurement systems - ${action.payload.message}`;
      }
      state.measurementsystems.status = StatusTypes.Rejected;
    });
    builder.addCase(getMeasurementTypes.pending, (state) => {
      state.measurementtypes.error = {};
      state.measurementtypes.status = StatusTypes.Pending;
    });
    builder.addCase(getMeasurementTypes.fulfilled, (state, action) => {
      const { data } = action.payload;

      state.measurementtypes.data = data;
      state.measurementtypes.status = StatusTypes.Fulfilled;
    });
    builder.addCase(getMeasurementTypes.rejected, (state, action) => {
      if (action.payload) {
        state.measurementtypes.error = action.payload;
        state.measurementtypes.error.message = `Error while retrieving measurement types - ${action.payload.message}`;
      }
      state.measurementtypes.status = StatusTypes.Rejected;
    });
    builder.addCase(getMeasurementUnits.pending, (state) => {
      state.measurementunits.error = {};
      state.measurementunits.status = StatusTypes.Pending;
    });
    builder.addCase(getMeasurementUnits.fulfilled, (state, action) => {
      const { data } = action.payload;

      state.measurementunits.data = data;
      state.measurementunits.status = StatusTypes.Fulfilled;
    });
    builder.addCase(getMeasurementUnits.rejected, (state, action) => {
      if (action.payload) {
        state.measurementunits.error = action.payload;
        state.measurementunits.error.message = `Error while retrieving measurement units - ${action.payload.message}`;
      }
      state.measurementunits.status = StatusTypes.Rejected;
    });
    builder.addCase(getThemes.pending, (state) => {
      state.themes.error = {};
      state.themes.status = StatusTypes.Pending;
    });
    builder.addCase(getThemes.fulfilled, (state, action) => {
      const { data } = action.payload;

      state.themes.data = data;
      state.themes.status = StatusTypes.Fulfilled;
    });
    builder.addCase(getThemes.rejected, (state, action) => {
      if (action.payload) {
        state.themes.error = action.payload;
        state.themes.error.message = `Error while retrieving themes - ${action.payload.message}`;
      }
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

export const enumReducer = enumSlice.reducer;
