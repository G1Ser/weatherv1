import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import type { FavoriteCity } from '@/types/storage';
import IP, { type IPState } from './modules/IP';
import City from './modules/City';

Vue.use(Vuex);

// 定义根 State 类型
export interface RootState {
  IP: IPState;
  City: FavoriteCity;
}

const storeOptions: StoreOptions<RootState> = {
  modules: {
    IP,
    City,
  },
};

export default new Vuex.Store<RootState>(storeOptions);
