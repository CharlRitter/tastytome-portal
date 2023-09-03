import { SliceItem } from "@/types/common";

export interface Category {
  id: number;
  value: string;
}

export interface MeasurementSystem {
  id: number;
  value: string;
}

export interface MeasurementType {
  id: number;
  value: string;
}

export interface MeasurementUnit {
  id: number;
  measurementsystemid: number | null;
  measurementsystem: MeasurementSystem | null;
  measurementtypeid: number;
  measurementtype: MeasurementType;
  value: string;
  abbreviation: string;
}

export interface Theme {
  id: number;
  value: string;
}

export interface EnumState {
  categories: SliceItem<Category[]>;
  measurementsystems: SliceItem<MeasurementSystem[]>;
  measurementtypes: SliceItem<MeasurementType[]>;
  measurementunits: SliceItem<MeasurementUnit[]>;
  themes: SliceItem<Theme[]>;
}
