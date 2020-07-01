/**
 * src/common/types.ts
 * Global custom types and interfaces.
 * © George Pickering 2020, https://github.com/geopic
 */

/**
 * localStorage data.
 */
export type LsData = {
  theme: 'light' | 'dark';
  plans: PlanData[];
};

/**
 * Data for a plan (or goal).
 */
export type PlanData = {
  id: string; // uuid format
  title: string;
  isUnlimited: boolean;
  squares: SquareData[];
};

/**
 * Data for each square which represents a day.
 */
export type SquareData = {
  id: string; // uuid format
  date: Date;
  isCompleted: boolean;
  notes: string | null;
};
