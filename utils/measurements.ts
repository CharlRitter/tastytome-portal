import {
  ImperialTempretureUnits,
  ImperialVolumeUnits,
  ImperialWeightUnits,
  MeasurementSystems,
  MeasurementTypes,
  MetricTempretureUnits,
  MetricVolumeUnits,
  MetricWeightUnits,
  NumberUnits,
  TimeUnits
} from '@/constants/measurements';

// eslint-disable-next-line import/prefer-default-export
export function getMeasurementUnits(measurementSystem: string, measurementType: string): string[] {
  if (measurementSystem === MeasurementSystems.Metric) {
    if (measurementType === MeasurementTypes.Volume) {
      return Object.values(MetricVolumeUnits);
    }
    if (measurementType === MeasurementTypes.Weight) {
      return Object.values(MetricWeightUnits);
    }
    if (measurementType === MeasurementTypes.Tempreture) {
      return Object.values(MetricTempretureUnits);
    }
    if (measurementType === MeasurementTypes.Number) {
      return Object.values(NumberUnits);
    }
    if (measurementType === MeasurementTypes.Time) {
      return Object.values(TimeUnits);
    }
  } else if (measurementSystem === MeasurementSystems.Imperial) {
    if (measurementType === MeasurementTypes.Volume) {
      return Object.values(ImperialVolumeUnits);
    }
    if (measurementType === MeasurementTypes.Weight) {
      return Object.values(ImperialWeightUnits);
    }
    if (measurementType === MeasurementTypes.Tempreture) {
      return Object.values(ImperialTempretureUnits);
    }
    if (measurementType === MeasurementTypes.Number) {
      return Object.values(NumberUnits);
    }
    if (measurementType === MeasurementTypes.Time) {
      return Object.values(TimeUnits);
    }
  }

  return [];
}
