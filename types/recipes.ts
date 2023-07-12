export interface Step {
  title: string;
  measurementType?: string | null;
  measurementUnit?: string | null;
  amount?: number | null;
  hours?: number | null;
  minutes?: number | null;
}

export interface Recipe {
  id: number | null;
  title: string;
  description: string;
  categories: string[];
  rating: number;
  difficulty: number;
  measurementSystem: string;
  ingredients: Step[];
  instructions: Step[];
  timers: Step[];
}
