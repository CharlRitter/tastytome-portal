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
  error: string | null;
  loading: boolean;
  categories: Category[];
  measurementsystems: MeasurementSystem[];
  measurementtypes: MeasurementType[];
  measurementunits: MeasurementUnit[];
  themes: Theme[];
}
