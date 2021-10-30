import createPersistedState from 'vuex-persistedstate'

export default createPersistedState({
  paths: ['history.actions', 'items.list'],
  storage: window.localStorage
})