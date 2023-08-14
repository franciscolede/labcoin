import { createStore } from 'vuex'

export default createStore({
  state: {
    username: null,
    logged: false,
  },

  getters: {

  },

  mutations: {
    setUsername(state, username) {
      console.log('Setting username to:', username);
      state.username = username;
    },
    setLogged(state) {
      state.logged = true;
    }
  },

  actions: {

  },

  modules: {

  }
})
