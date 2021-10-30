import Vue from 'vue'
import Vuex from 'vuex'

import storage from '../plugins/storage'

import items from './items'
import history from './history'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    items,
    history
  },
  plugins: [
    storage
  ]
})
