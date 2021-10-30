export default {
  namespaced: true,
  
  state: () => ({ 
    actions: []
  }),
  mutations: {
    addAction(state, payload) {
      state.actions.push(payload)
    }
  },
  actions: {
    addAction({ commit }, payload) {
      const action = { 
        type: payload.favourite,
        item: payload
      }
      commit('addAction', action)
    }
  },
  getters: {
    actions: (state) => () => {
      return state.actions
    }
  }
}