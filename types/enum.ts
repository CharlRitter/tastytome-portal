import { SliceItem } from '@/types/common';

export type Category = {
  id: number;
  value: string;
};

export type MeasurementSystem = {
  id: number;
  value: string;
};

export type MeasurementType = {
  id: number;
  value: string;
};

export type MeasurementUnit = {
  id: number;
  measurementsystemid: number | null;
  measurementsystem: MeasurementSystem | null;
  measurementtypeid: number;
  measurementtype: MeasurementType;
  value: string;
  abbreviation: string;
  conversionfactor: string;
};

export type Theme = {
  id: number;
  value: string;
};

export type EnumState = {
  categories: SliceItem<Category[]>;
  measurementsystems: SliceItem<MeasurementSystem[]>;
  measurementtypes: SliceItem<MeasurementType[]>;
  measurementunits: SliceItem<MeasurementUnit[]>;
  themes: SliceItem<Theme[]>;
};
