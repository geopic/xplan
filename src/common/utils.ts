/**
 * src/common/utils.ts
 * Global functions, a.k.a. 'utils'.
 * © George Pickering 2020, https://github.com/geopic
 */

import props from '@/common/props';
import { LsData } from '@/common/types';

export default {
  /**
   * Initialise localStorage entry with default data object.
   */
  initLS(): void {
    const data: LsData = { theme: 'light', data: [] };
    localStorage.setItem(props.site.lsEntry, JSON.stringify(data));
  },

  /**
   * Get all data from localStorage.
   * @returns The data from localStorage, or null if no entry exists.
   */
  loadAllDataFromLS(): LsData | null {
    return localStorage.getItem(props.site.lsEntry)
      ? JSON.parse(localStorage.getItem(props.site.lsEntry) as string)
      : null;
  },

  /**
   * Save all data (overwriting current entry) to localStorage.
   * @param data The data to save to localStorage.
   */
  saveAllToLS(data: LsData) {
    localStorage.setItem(props.site.lsEntry, JSON.stringify(data));
  },

  /**
   * Clear all data related to site from localStorage.
   */
  clearAllFromLS() {
    localStorage.removeItem(props.site.lsEntry);
  }
};
