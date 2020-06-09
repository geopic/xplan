/**
 * src/common/utils.ts
 * Global functions, a.k.a. 'utils'.
 * © George Pickering 2020, https://github.com/geopic
 */

import props from '@/common/props';
import { LsData } from '@/common/types';

export default {
  data: {
    /**
     * Get all data from localStorage.
     * @returns The data from localStorage, or null if no entry exists.
     */
    loadAll(): LsData | null {
      return (
        JSON.parse(localStorage.getItem(props.site.lsEntry) as string) || {
          theme: 'light',
          plans: []
        }
      );
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
