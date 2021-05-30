export default {

  state: {
    order: []
  },

  mutations: {
    SET_ORDER(state, val) {
      state.order = val
    }
  },

  getters: {
    order(state) {
      return state.order
    }
  }
}
