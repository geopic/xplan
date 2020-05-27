import Vue from 'vue';
import Vuex from 'vuex';
import props from '@/common/props';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    siteName: props.site.name
  },
  mutations: {},
  actions: {},
  modules: {}
});
