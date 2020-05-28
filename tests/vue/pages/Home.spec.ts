import { shallowMount } from '@vue/test-utils';
import Home from '@/vue/pages/Home.vue';

const vm = shallowMount(Home);

describe('Home', () => {
  test('renders a div', () => {
    expect(() => vm.get('div')).not.toThrow();
  });
});
