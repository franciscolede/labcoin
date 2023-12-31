<template>
  <div class="history-page">
    <h1>Historial de transacciones de {{ username }}</h1>
    <Loading v-if="loading"></Loading>
    <div v-if="!loading" class="container-xs">
      <ul v-if="transactions.length > 0">
        <li v-for="(transaction, index) in transactions" :key="transaction.datetime">
          <div class="transaction">
            <p>Transacción {{ transactions.length - index }}</p>
            <div class="transaction-box"
              :class="{ 'purchase': transaction.action === 'purchase', 'sale': transaction.action === 'sale' }">
              <p>Tipo de cripto: {{ transaction.crypto_code }}</p>
              <p>Acción realizada: {{ transaction.action }}</p>
              <p>Cantidad de cripto: {{ transaction.crypto_amount }}</p>
              <p>Dinero en pesos: {{ formatNumber(transaction.money) }}</p>
              <p>Id de la transacción: {{ transaction._id }}</p>
              <p>Fecha: {{ formatDateTime(transaction.datetime) }}</p>
            </div>
            <button @click="saveTransactionId(transaction._id)" class="btn btn-danger" data-bs-toggle="modal"
              data-bs-target="#confirmDelete">Eliminar Nº{{ transactions.length - index }}</button>

            <div class="modal" id="confirmDelete">
              <div class="modal-dialog">
                <div class="modal-content">

                  <div class="modal-header">
                    <h5 class="modal-title">Eliminar transacción</h5>
                    <button class="btn-close" data-bs-dismiss="modal"></button>
                  </div>

                  <div class="modal-body">
                    <h6>Confirme que está seguro de eliminar esta transacción.</h6>
                  </div>

                  <div class="modal-footer">
                    <button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button @click="deleteTransactionLocal(deleteTransactionId)" data-bs-dismiss="modal"
                      class="btn btn-danger">Eliminar</button>
                  </div>

                </div>
              </div>
            </div>

            <!---------------- -->

            <button @click="saveTransactionId(transaction._id)" class="btn btn-primary" data-bs-toggle="modal"
              data-bs-target="#confirmEdit">Editar Nº{{ transactions.length - index }}</button>

            <div class="modal" id="confirmEdit">
              <div class="modal-dialog">
                <div class="modal-content">

                  <div class="modal-header">
                    <h5 class="modal-title">Editar transacción</h5>
                    <button class="btn-close" data-bs-dismiss="modal"></button>
                  </div>

                  <div class="modal-body">
                    <h6>Ingrese el nuevo monto de {{ transaction.crypto_code }}:</h6>
                    <input class="input" type="number" id="crypto_amount" v-model="crypto_amount" min="0" step="0.01">

                    <h6>Ingrese el nuevo monto de ARS:</h6>
                    <input class="input" type="number" id="money" v-model="money" min="0" step="0.01">
                  </div>



                  <div class="modal-footer">
                    <button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button @click="editTransactionLocal(editTransactionId, crypto_amount, money)" class="btn btn-primary"
                      data-bs-dismiss="modal">Editar</button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <h3 v-else>Historial vacío</h3>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Loading from '@/components/loading.vue';

export default {
  name: "HistoryView",
  components: {
    Loading,
  },
  data() {
    return {
      loading: false,
      transactions: [],
      deleteTransactionId: null,
      editTransactionId: null,

      crypto_amount: 0,
      money: 0,
    };
  },
  computed: {
    ...mapGetters(['username']),
  },
  methods: {
    ...mapActions('transactions', ['getHistory', 'deleteTransaction']),

    async deleteTransactionLocal(transactionId) {
      try {
        await this.deleteTransaction(transactionId);

        this.transactions = this.transactions.filter(transaction => transaction._id !== transactionId);
        this.updateHistory();
      } catch (error) {
        console.error('Error al eliminar la transacción:', error);
      }
    },

    async editTransactionLocal(transactionId, crypto_amount, money) {
      try {
        const newValues = {};

        if (crypto_amount > 0) {
          newValues.crypto_amount = crypto_amount;
        }

        if (money > 0) {
          newValues.money = money;
        }

        if (Object.keys(newValues).length > 0) {
          await this.$store.dispatch('transactions/editTransaction', { transactionId, newValues });
          this.updateHistory();
        } else {
          console.log('No se realizaron cambios ya que los valores no son mayores a 0.');
        }
      } catch (error) {
        console.error('Error al editar la transacción:', error);
      }
    },

    saveTransactionId(transactionId) {
      this.deleteTransactionId = transactionId;
      this.editTransactionId = transactionId;
    },

    async updateHistory() {
      try {
        this.loading = true;
        const response = await this.getHistory(this.username);
        console.log(response);
        this.transactions = response.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
      } catch (error) {
        console.error('Error al obtener el historial:', error);
      } finally {
        this.loading = false;
      }
    },

    formatDateTime(isoDateTime) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      const formattedDate = new Date(isoDateTime).toLocaleDateString('es-AR', options);
      return formattedDate;
    },

    formatNumber(number) {
      const numStr = number.toString();
      const parts = numStr.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      return parts.join(',');
    },
  },
  created() {
    this.updateHistory();
  },
};
</script>

<style scoped>
.history-page {
  padding: 10px;
}

li {
  margin: 20px;
  list-style-type: none;
}

p {
  margin: 0;
  padding: 0;
}

.transaction {
  text-align: center;
}

.transaction-box {
  display: flex;
  flex-direction: column;

  border: 1px solid black;
  border-radius: 50px;
}

.purchase {
  background-color: rgba(197, 36, 98, 0.534);
}

.sale {
  background-color: rgba(29, 182, 136, 0.534);
}

h5,
h6 {
  color: black;
}
</style>
