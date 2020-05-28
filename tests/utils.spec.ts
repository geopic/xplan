import props from '@/common/props';
import { LsData } from '@/common/types';
import utils from '@/common/utils';

describe('utils', () => {
  beforeEach(() => localStorage.clear());

  const data: LsData = { theme: 'light' };
  test('loadDataFromLS', () => {
    localStorage.setItem(props.site.lsEntry, JSON.stringify(data));
    expect(utils.loadDataFromLS()).toEqual(data);
  });

  test('saveDataToLS', () => {
    utils.saveDataToLS(data);
    expect(localStorage.getItem(props.site.lsEntry)).toEqual(
      JSON.stringify(data)
    );
  });

  test('clearDataFromLS', () => {
    localStorage.setItem(props.site.lsEntry, JSON.stringify(data));
    expect(localStorage.getItem(props.site.lsEntry)).toEqual(
      JSON.stringify(data)
    );
    utils.clearDataFromLS();
    expect(localStorage.getItem(props.site.lsEntry)).toEqual(null);
  });
});
