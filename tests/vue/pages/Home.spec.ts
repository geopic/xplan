import { mount } from '@vue/test-utils';
import Home from '@/vue/pages/Home.vue';
import { PlanData } from '@/common/types';
import { v4 as uuid } from 'uuid';
import props from '@/common/props';
import utils from '@/common/utils';

describe('Home', () => {
  describe('no data exists', () => {
    const wrapper = mount(Home);

    test('renders an intro element', () => {
      expect(() => wrapper.get('#site-intro')).not.toThrow();
    });

    test('renders a form', () => {
      expect(() => wrapper.get('form')).not.toThrow();
    });

    test('does not attempt to render any data', () => {
      expect(() => wrapper.get('.plan-square')).toThrow();
    });
  });

  describe('data exists', () => {
    describe('unlimited number of days', () => {
      const data = utils.storage.default;

      data.plans = [
        {
          id: uuid(),
          title: 'Write unit tests',
          isUnlimited: true,
          squares: [
            {
              id: uuid(),
              date: new Date(),
              isCompleted: false,
              notes: null
            }
          ]
        }
      ];

      localStorage.setItem(props.site.lsEntry, JSON.stringify(data));

      const wrapper = mount(Home);

      test('renders one square', () => {
        expect(() => wrapper.get('.plan-square')).not.toThrow();
      });

      test("renders 'unlimited' marker", () => {
        expect(() => wrapper.get('.plan-unlimited-box')).not.toThrow();
      });
    });

    describe('non-unlimited number of days', () => {});
  });
});
