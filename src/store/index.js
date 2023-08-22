import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';

export default createStore({
  state: {
    username: null,
    isLoggedIn: false,
  },

  getters: {
    username: state => state.username,
    isLoggedIn: state => state.isLoggedIn
  },

  mutations: {
    login(state, username) {
      state.username = username;
      state.isLoggedIn = true;
    },
    
    logout(state) {
      state.username = '';
      state.isLoggedIn = false;
    }
  },

  actions: {
    async login({ commit }, username) {
      try {
        // You can perform additional validation or checks here if needed
        commit('login', username);

      } catch (error) {
        console.error('Error during login:', error);
      }
    },

    async logout({ commit }) {
      try {
        // You can perform additional actions during logout if needed
        commit('logout');

      } catch (error) {
        console.error('Error during logout:', error);
      }
    }
  },

  modules: {

  },

  plugins: [
    new VuexPersistence({
      storage: window.localStorage
    }).plugin
  ]
})
