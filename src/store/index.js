import { createStore } from 'vuex'

export default createStore({
  state: {
    username: "",
  },

  getters: {
    username(state){
      return state.username;
    }
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
