import { shallowMount } from '@vue/test-utils';
import Home from '@/vue/pages/Home.vue';
import { PlanData } from '@/common/types';
import { v4 as uuid } from 'uuid';

describe('Home', () => {
  describe('no data exists', () => {
    const vm = shallowMount(Home, { propsData: { data: [] } });

    test('renders an intro element', () => {
      expect(() => vm.get('#site-intro')).not.toThrow();
    });

    test('renders a form', () => {
      expect(() => vm.get('form')).not.toThrow();
    });

    test('does not attempt to render any data', () => {
      expect(() => vm.get('.plan-square')).toThrow();
    });
  });

  describe.skip('data exists', () => {
    describe('unlimited number of days', () => {
      const d: PlanData = {
        id: uuid(),
        plan: 'Write unit tests',
        isUnlimited: false,
        squares: [
          {
            id: uuid(),
            date: new Date(),
            isCompleted: false,
            notes: null
          }
        ]
      };

      const vm = shallowMount(Home, { propsData: { data: d } });

      test('renders one square', () => {
        expect(() => vm.get('.plan-square')).not.toThrow();
      });

      test('renders "unlimited" marker', () => {});
    });

    describe('non-unlimited number of days', () => {});
  });
});
