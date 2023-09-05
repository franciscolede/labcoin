import axios from 'axios'

const apiClient = axios.create({
	baseURL: 'https://labor3-d60e.restdb.io/rest/',
	headers: {'x-apikey': '64a2e9bc86d8c525a3ed8f63'}
});


const state = {
};

const getters = {
};

const mutations = {
};

const actions = {
    async newPurchase({ commit }, purchaseData) {
      try {
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
        const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;

        // Agregar la fecha y hora al objeto de compra
        purchaseData.datetime = `${formattedDate} ${formattedTime}`;

        const response = await apiClient.post('transactions', purchaseDataData);
  
        return response.data; // Opcionalmente, puedes retornar datos de la respuesta si deseas
      } catch (error) {
        console.error('Error al crear la transacción:', error);
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
