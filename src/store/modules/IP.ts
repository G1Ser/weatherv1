import { getIpLocation } from '@/api/gmap';
import { getLocationGeocode } from '@/utils/gmap';
import type { Module, ActionContext } from 'vuex';

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
  localLocation: process.env.VUE_APP_LOCAL_LOCATION || '北京市',
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

// Actions
const actions = {
  async initLocation({ commit }: ActionContext<IPState, RootState>) {
    const res = await getIpLocation();
    if (res.country !== '中国') return;
    commit('SET_LOCAL_LOCATION', res.city);
  },
  async initGeocode({ commit, state }: ActionContext<IPState, RootState>) {
    const geocode = await getLocationGeocode(state.localLocation);
    commit('SET_LOCAL_GEOCODE', geocode);
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
  actions,
  getters,
};

export default IPModule;
export type { IPState };
