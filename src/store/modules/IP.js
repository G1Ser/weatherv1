import { getIpLocation } from '@/api/gmap';
import { getLocationGeocode } from '@/utils/gmap';

const state = {
  localLocation: process.env.VUE_APP_LOCAL_LOCATION || '北京',
  localGeocode: '',
};

const mutations = {
  SET_LOCAL_LOCATION(state, location) {
    state.localLocation = location;
  },
  SET_LOCAL_GEOCODE(state, geocode) {
    state.localGeocode = geocode;
  },
};

const actions = {
  async initLocation({ commit }) {
    const res = await getIpLocation();
    if (res.country !== '中国') return;
    commit('SET_LOCAL_LOCATION', res.city);
  },
  async initGeocode({ commit, state }) {
    const geocode = await getLocationGeocode(state.localLocation);
    commit('SET_LOCAL_GEOCODE', geocode);
  },
};

const getters = {
  localLocation: state => state.localLocation,
  localGeocode: state => state.localGeocode,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
