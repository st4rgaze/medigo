import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    hospitals: [],
  },
  mutations: {
    addHospital(state, hospital) {
      state.hospitals.push(hospital);
    },
  },

});
