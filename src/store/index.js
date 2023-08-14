import { createStore } from 'vuex'

export default createStore({
  state: {
    username: null,
  },

  getters: {

  },

  mutations: {
    setUsername(state, username) {
      console.log('Setting username to:', username);
      state.username = username;
    },
  },

  actions: {

  },

  modules: {

  }
})
