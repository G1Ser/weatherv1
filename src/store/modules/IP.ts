import { ActionContext } from 'vuex';
import { getIpLocation } from '@/api/gmap';
import { getLocationGeocode } from '@/utils/gmap';
import type { IpLocationResponseType } from '@/types/gmap';

interface IPState {
  localLocation: string;
  localGeocode: string;
}

const state: IPState = {
  localLocation: process.env.VUE_APP_LOCAL_LOCATION || '北京',
  localGeocode: '',
};

const mutations = {
  SET_LOCAL_LOCATION(state: IPState, location: string) {
    state.localLocation = location;
  },
  SET_LOCAL_GEOCODE(state: IPState, geocode: string) {
    state.localGeocode = geocode;
  },
};

const actions = {
  async initLocation({ commit }: ActionContext<IPState, any>) {
    const res: IpLocationResponseType = await getIpLocation();
    if (res.country !== '中国') return;
    commit('SET_LOCAL_LOCATION', res.city);
  },
  async initGeocode({ commit, state }: ActionContext<IPState, any>) {
    const geocode = await getLocationGeocode(state.localLocation);
    commit('SET_LOCAL_GEOCODE', geocode);
  },
};

const getters = {
  localLocation: (state: IPState) => state.localLocation,
  localGeocode: (state: IPState) => state.localGeocode,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
