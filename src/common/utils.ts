/**
 * src/common/utils.ts
 * Global functions, a.k.a. 'utils'.
 * © George Pickering 2020, https://github.com/geopic
 */

import props from '@/common/props';
import { LsData } from '@/common/types';

export default {
  /**
   * Get data from localStorage.
   * @returns The data from localStorage.
   */
  loadDataFromLS(): LsData | null {
    return localStorage.getItem(props.site.lsEntry)
      ? JSON.parse(localStorage.getItem(props.site.lsEntry) as string)
      : null;
  },

  /**
   * Save data to localStorage.
   * @param data The data to save to localStorage.
   */
  saveDataToLS(data: LsData) {
    localStorage.setItem(props.site.lsEntry, JSON.stringify(data));
  },

  /**
   * Clear all data (related to site) from localStorage.
   */
  clearDataFromLS() {
    localStorage.removeItem(props.site.lsEntry);
  }
};
