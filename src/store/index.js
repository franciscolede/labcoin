import { createStore } from 'vuex';

export default createStore({
  state: {
    username: localStorage.getItem('username') || '',
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true'
  },

  getters: {
    username: state => state.username,
    isLoggedIn: state => state.isLoggedIn
  },

  mutations: {
    setUserId(state, username) {
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
        commit('setUserId', username);

        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('username', username);
      } catch (error) {
        console.error('Error during login:', error);
      }
    },

    async logout({ commit }) {
      try {
        // You can perform additional actions during logout if needed
        commit('logout');

        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
      } catch (error) {
        console.error('Error during logout:', error);
      }
    }
  },

  modules: {

  }
})
