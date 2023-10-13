<template>
  <div class="history-page">
    <h1>Historial de transacciones de {{ username }}</h1>
    <div class="container-xs">
      <ul>
        <li v-for="(transaction, index) in transactions" :key="transaction._id">
          <div class="transaction">
            <p>Transacción {{ index + 1 }}</p>
            <div class="transaction-box" :class="{'purchase': transaction.action === 'purchase'}">
              <p>Tipo de cripto: {{ transaction.crypto_code }}</p>
              <p>Acción realizada: {{ transaction.action }}</p>
              <p>Cantidad de cripto: {{ transaction.crypto_amount }}</p>
              <p>Dinero en pesos: {{ transaction.money }}</p>
              <p>id de la transacción: {{ transaction._id }}</p>
              <p>Fecha: {{ transaction.datetime }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "HistoryView",
  components: {},
  data() {
    return {
      transactions: [],
    };
  },
  computed: {
    ...mapGetters(['username']),
  },
  methods: {
    ...mapActions('transactions', ['getHistory']),
  },
  created() {
    this.getHistory(this.username)
      .then((response) => {
        this.transactions = response;
      })
      .catch((error) => {
        console.error('Error al obtener el historial:', error);
      });
  },
};
</script>

<style scoped>
.history-page {
  padding: 10px;
}

li{
  margin: 20px;
  list-style-type: none;
}

p{
  margin: 0;
  padding: 0;
}

.transaction{
  text-align: center;
}

.transaction-box{
  display: flex;
  flex-direction: column;

  border: 1px solid black;
  border-radius: 50px;
}

.purchase {
  background-color: rgba(29, 182, 136, 0.534);
}

.sale{
  background-color: rgba(197, 36, 98, 0.534);
}

</style>
