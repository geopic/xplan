import props from '@/common/props';
import utils from '@/common/utils';

describe('utils', () => {
  describe("'plans' methods", () => {
    describe('initNewPlan', () => {
      test('creates a title when no title is passed in as an argument', () => {
        expect(utils.plans.initNewPlan('', 0).title.length).toBeGreaterThan(0);
      });

      test('is unlimited when no. of days is zero, otherwise is not', () => {
        expect(utils.plans.initNewPlan('', 0).isUnlimited).toBe(true);
        expect(utils.plans.initNewPlan('', 7).isUnlimited).toBe(false);
      });
    });
  });

  describe("'storage' methods", () => {
    beforeEach(() => localStorage.clear());

    const data = utils.storage.default;

    test('loadAll', () => {
      expect(utils.storage.loadAll()).toEqual(null);
      localStorage.setItem(props.site.lsEntry, JSON.stringify(data));
      expect(utils.storage.loadAll()).toEqual(data);
    });

    test('saveAll', () => {
      utils.storage.saveAll(data);
      expect(localStorage.getItem(props.site.lsEntry)).toEqual(
        JSON.stringify(data)
      );
    });

    test('clearAll', () => {
      localStorage.setItem(props.site.lsEntry, JSON.stringify(data));
      expect(localStorage.getItem(props.site.lsEntry)).toEqual(
        JSON.stringify(data)
      );
      utils.storage.clearAll();
      expect(localStorage.getItem(props.site.lsEntry)).toEqual(null);
    });
  });
});
