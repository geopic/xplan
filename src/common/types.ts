/**
 * src/common/types.ts
 * Global custom types and interfaces.
 * © George Pickering 2020, https://github.com/geopic
 */

/**
 * localStorage data.
 */
export type LsData = {
  /**
   * Site theme.
   */
  theme: 'light' | 'dark';

  /**
   * Date format, to be processed by date-fns.
   *
   * https://date-fns.org/docs/format
   */
  dateFormat: string;

  /**
   * One or multiple plans set by the user.
   */
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
