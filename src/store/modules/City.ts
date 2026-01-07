import type { Module } from 'vuex';
import type { FavoriteCity } from '@/types/storage';

// 定义 RootState 类型（根 store 的 state）
interface RootState {
  City: FavoriteCity;
}

// State
const state: FavoriteCity = {
  adcode: '',
  name: '',
};

// Mutations
const mutations = {
  SET_ADCODE(state: FavoriteCity, adcode: string): void {
    state.adcode = adcode;
  },
  SET_CITYNAME(state: FavoriteCity, name: string): void {
    state.name = name;
  },
};

// Getters
const getters = {
  adcode: (state: FavoriteCity): string => state.adcode,
  name: (state: FavoriteCity): string => state.name,
};

// 导出模块
const CityModule: Module<FavoriteCity, RootState> = {
  namespaced: true,
  state,
  mutations,
  getters,
};

export default CityModule;
