import { createSlice } from '@reduxjs/toolkit';

import * as api from '@/api/enumApi';
import { SliceItem } from '@/types/common';
import { Category, EnumState, MeasurementSystem, MeasurementType, MeasurementUnit, Theme } from '@/types/enum';
import { createThunk } from '@/utils/common';

const initialState: EnumState = {
  categories: { data: [] },
  measurementsystems: { data: [] },
  measurementtypes: { data: [] },
  measurementunits: { data: [] },
  themes: { data: [] }
};

export const getCategories = createThunk<Category[]>(api.getCategories, 'enum/getCategories');
export const getMeasurementSystems = createThunk<MeasurementSystem[]>(
  api.getMeasurementSystems,
  'enum/getMeasurementSystems'
);
export const getMeasurementTypes = createThunk<MeasurementType[]>(api.getMeasurementTypes, 'enum/getMeasurementTypes');
export const getMeasurementUnits = createThunk<MeasurementUnit[]>(api.getMeasurementUnits, 'enum/getMeasurementUnits');
export const getThemes = createThunk<Theme[]>(api.getThemes, 'enum/getThemes');

const enumSlice = createSlice({
  name: 'enumSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const cases: {
      action:
        | typeof getCategories
        | typeof getMeasurementSystems
        | typeof getMeasurementTypes
        | typeof getMeasurementUnits
        | typeof getThemes;
      key: keyof EnumState;
    }[] = [
      { action: getCategories, key: 'categories' },
      { action: getMeasurementSystems, key: 'measurementsystems' },
      { action: getMeasurementTypes, key: 'measurementtypes' },
      { action: getMeasurementUnits, key: 'measurementunits' },
      { action: getThemes, key: 'themes' }
    ];

    cases.forEach(({ action, key }) => {
      builder.addCase(action.fulfilled, (state, action) => {
        const { data } = action.payload.data;

        state[key].data = data;
      });
    });
  }
});

export const selectCategories = (state: EnumState): SliceItem<Category[]> => state.categories;
export const selectMeasurementSystems = (state: EnumState): SliceItem<MeasurementSystem[]> => state.measurementsystems;
export const selectMeasurementTypes = (state: EnumState): SliceItem<MeasurementType[]> => state.measurementtypes;
export const selectMeasurementUnits = (state: EnumState): SliceItem<MeasurementUnit[]> => state.measurementunits;
export const selectThemes = (state: EnumState): SliceItem<Theme[]> => state.themes;

export const enumReducer = enumSlice.reducer;
