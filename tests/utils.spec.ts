import props from '@/common/props';
import { LsData } from '@/common/types';
import utils from '@/common/utils';

describe('utils', () => {
  describe('data methods', () => {
    beforeEach(() => localStorage.clear());

    const data: LsData = { theme: 'light', data: [] };

    test('init', () => {
      expect(localStorage.getItem(props.site.lsEntry)).toBe(null);
      utils.data.init();
      expect(localStorage.getItem(props.site.lsEntry)).toEqual(
        JSON.stringify(data)
      );
    });

    test('loadAll', () => {
      expect(utils.data.loadAll()).toEqual(null);
      localStorage.setItem(props.site.lsEntry, JSON.stringify(data));
      expect(utils.data.loadAll()).toEqual(data);
    });

    test('saveAll', () => {
      utils.data.saveAll(data);
      expect(localStorage.getItem(props.site.lsEntry)).toEqual(
        JSON.stringify(data)
      );
    });

    test('clearAll', () => {
      localStorage.setItem(props.site.lsEntry, JSON.stringify(data));
      expect(localStorage.getItem(props.site.lsEntry)).toEqual(
        JSON.stringify(data)
      );
      utils.data.clearAll();
      expect(localStorage.getItem(props.site.lsEntry)).toEqual(null);
    });
  });
});
