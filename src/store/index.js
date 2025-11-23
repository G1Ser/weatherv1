import Vue from 'vue';
import Vuex from 'vuex';
import IP from './modules/IP';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    IP,
  },
});
