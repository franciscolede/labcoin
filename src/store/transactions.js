import axios from 'axios'

const apiClient = axios.create({
	baseURL: 'https://laboratorio3-f36a.restdb.io/rest/transactions',
	headers: {'x-apikey': '60eb09146661365596af552f'}
});


const state = {
};

const getters = {
};

const mutations = {
};

const actions = {
  async newPurchase(_, purchaseData) {
    try {
      const response = await apiClient.post('', purchaseData);

      return response.data;
    } catch (error) {
      console.error('Error al crear la transacción:', error);
    }
  },

  async getHistory(_, username) {
    try {
      const response = await apiClient.get(`https://laboratorio3-f36a.restdb.io/rest/transactions?q={"user_id":"${username}"}`);
      return response.data;
    } catch (error) {
      console.error('Error al devolver el historial:', error);
    }
  },

  };

  

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
