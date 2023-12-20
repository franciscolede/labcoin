import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';
import criptosModule from './criptos';
import transactionsModule from './transactions';

export default createStore({
  state: {
    username: null,
    isLoggedIn: false,
  },

  getters: {
    username: state => state.username,
    isLoggedIn: state => state.isLoggedIn,
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
    async login({ commit, dispatch }, username) {
      try {
        commit('login', username);
      } catch (error) {
        console.error('Error durante el inicio de sesión:', error);
      }
    },

    async logout({ commit }) {
      try {
        commit('logout');
      } catch (error) {
        console.error('Error durante el cierre de sesión:', error);
      }
    },
  },

  modules: {
    criptos: criptosModule,
    transactions: transactionsModule,
  },

  plugins: [
    new VuexPersistence({
      storage: window.localStorage
    }).plugin
  ]
});
