import itemsService from '../services/items'

const items = []

export default {
  namespaced: true,
  
  state: () => ({ 
    list: items
  }),
  mutations: {
    setItems(state, payload) {
      state.list = payload
    },
    setItem(state, index, value) {
      state.list[index] = value
    }
  },
  actions: {
    async update({ commit, state }) {
      if (!state.list.length) {
        const request = await itemsService.list()
        if (request.status == 200) {
          commit('setItems', request.data)
        }
      }
    },

    addToFavourite(ctx, payload) {
      var item = payload;
      item.favourite = !item.favourite
      this.dispatch('history/addAction', item)
    }
  },
  getters: {
    list: (state) => () => {
      return state.list
    }
  }
}