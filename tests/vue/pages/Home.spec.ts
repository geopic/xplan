import { shallowMount } from '@vue/test-utils';
import Home from '@/vue/pages/Home.vue';
import { PlanData } from '@/common/types';

describe('Home', () => {
  describe('no data exists', () => {
    const vm = shallowMount(Home, { propsData: { data: [] } });

    test('renders an intro element', () => {
      expect(() => vm.get('#site-intro')).not.toThrow();
    });

    test('renders a form', () => {
      expect(() => vm.get('form')).not.toThrow();
    });
  });

  describe('data exists', () => {});
});
