const state = {
  hospitals: [],
};

const mutations = {
  SET_HOSPITALS(state, hospitals) {
    state.hospitals = hospitals;
  },
};

const actions = {
  searchHospital: ({ commit }, order) => {
    commit();
  },
  initHospital: ({ commit }) => {
    commit('SET_HOSPITALS', hospitals);
  },
};

const getters = {
  hospitals: state => state.hospitals,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
