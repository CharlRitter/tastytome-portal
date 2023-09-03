export const DRAWER_WIDTH = 240;

export enum ListTypes {
  Instructions = 'Instructions',
  Ingredients = 'Ingredients',
  Timers = 'Timers'
}

export enum StatusTypes {
  Pending = 'Pending',
  Fulfilled = 'Fulfilled',
  Rejected = 'Rejected',
}

export enum OperationTypes {
  Get = 'Get',
  Create = 'Create',
  Delete = 'Delete',
  Update = 'Update'
}

export enum Mode {
  Add = 'add',
  Edit = 'edit',
  View = 'view',
}
