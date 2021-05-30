export default {

  state: {
    user: {},
    address: {},
    geolocation: {}
  },

  mutations: {
    SET_USER(state, val) {
      state.user = val
    },
    SET_ADDRESS(state, val) {
      state.address = val
    },
    SET_GEOLOCATION(state, val) {
      state.geolocation = val
    }
  },

  getters: {
    user(state) {
      return state.user
    },
    address(state) {
      return state.address
    },
    geolocation(state) {
      return state.geolocation
    }
  }
}
