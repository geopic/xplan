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
   * Site locale, using ISO 639-1 standard.
   *
   * https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
   */
  locale: 'de' | 'en' | 'es' | 'fr' | 'ru' | 'zh';

  /**
   * Date format, to be processed by date-fns.
   *
   * https://date-fns.org/docs/format
   */
  dateFormat: string;

  /**
   * Display plans' sort order from start date to today, or vice versa.
   */
  startDateFirst: boolean;

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
