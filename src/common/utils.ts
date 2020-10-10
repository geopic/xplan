/**
 * src/common/utils.ts
 * Global functions, a.k.a. 'utils'.
 * © George Pickering 2020, https://github.com/geopic
 */

import props from '@/common/props';
import { LsData, PlanData } from '@/common/types';
import { addDays } from 'date-fns';
import { v4 as uuid } from 'uuid';

export default {
  plans: {
    /**
     * Create a new 'plan' object out of a title and number of days, then returns it.
     * @param title The title of the plan.
     * @param days How many days it has been set for.
     * @returns Fully initialised 'plan' object.
     */
    initNewPlan(title: string, days: number): PlanData {
      const plan: PlanData = {
        id: uuid(),
        title: title || 'Think up a plan',
        isUnlimited: days === 0,
        squares: [
          { id: uuid(), date: new Date(), isCompleted: false, notes: null }
        ]
      };

      for (let i = 1; i < days; i++) {
        plan.squares.push({
          id: uuid(),
          date: addDays(new Date(), i),
          isCompleted: false,
          notes: null
        });
      }

      return plan;
    }
  },
  storage: {
    /**
     * Default storage object, for use when no localStorage entry exists.
     */
    default: { theme: 'light', dateFormat: 'EEE do MMM', plans: [] } as LsData,

    /**
     * Get all data from localStorage.
     * @returns The data from localStorage, or null if no entry exists.
     */
    loadAll(): LsData | null {
      return JSON.parse(localStorage.getItem(props.site.lsEntry) as string);
    },

    /**
     * Save all data (overwriting current entry) to localStorage.
     * @param data The data to save to localStorage.
     */
    saveAll(data: LsData): void {
      localStorage.setItem(props.site.lsEntry, JSON.stringify(data));
    },

    /**
     * Clear all data related to site from localStorage.
     */
    clearAll(): void {
      localStorage.removeItem(props.site.lsEntry);
    }
  }
};
