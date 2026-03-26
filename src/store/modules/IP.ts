import type { Module } from 'vuex';

// 定义 State 类型
interface IPState {
  localLocation: string;
  localGeocode: string;
}

// 定义 RootState 类型（根 store 的 state）
interface RootState {
  IP: IPState;
}

// State
const state: IPState = {
  localLocation: '',
  localGeocode: '',
};

// Mutations
const mutations = {
  SET_LOCAL_LOCATION(state: IPState, location: string): void {
    state.localLocation = location;
  },
  SET_LOCAL_GEOCODE(state: IPState, geocode: string): void {
    state.localGeocode = geocode;
  },
};

// Getters
const getters = {
  localLocation: (state: IPState): string => state.localLocation,
  localGeocode: (state: IPState): string => state.localGeocode,
};

// 导出模块
const IPModule: Module<IPState, RootState> = {
  namespaced: true,
  state,
  mutations,
  getters,
};

export default IPModule;
export type { IPState };
