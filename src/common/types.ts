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
  data: PlanData[];
};

/**
 * Data for a plan (or goal).
 */
export type PlanData = {
  plan: string;
  squares: SquareData[];
};

/**
 * Data for each square which represents a day.
 */
export type SquareData = {
  date: Date;
  isCompleted: boolean;
  notes: string | null;
};
