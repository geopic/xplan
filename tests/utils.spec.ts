import props from '@/common/props';
import { LsData } from '@/common/types';
import utils from '@/common/utils';

describe('utils', () => {
  beforeEach(() => localStorage.clear());

  const data: LsData = { theme: 'light', data: [] };

  test('initLS', () => {
    expect(localStorage.getItem(props.site.lsEntry)).toBe(null);
    utils.initLS();
    expect(localStorage.getItem(props.site.lsEntry)).toEqual(
      JSON.stringify(data)
    );
  });

  test('loadAllDataFromLS', () => {
    localStorage.setItem(props.site.lsEntry, JSON.stringify(data));
    expect(utils.loadAllDataFromLS()).toEqual(data);
  });

  test('saveAllToLS', () => {
    utils.saveAllToLS(data);
    expect(localStorage.getItem(props.site.lsEntry)).toEqual(
      JSON.stringify(data)
    );
  });

  test('clearAllFromLS', () => {
    localStorage.setItem(props.site.lsEntry, JSON.stringify(data));
    expect(localStorage.getItem(props.site.lsEntry)).toEqual(
      JSON.stringify(data)
    );
    utils.clearAllFromLS();
    expect(localStorage.getItem(props.site.lsEntry)).toEqual(null);
  });
});
