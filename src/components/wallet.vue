<template>
  <div>
    <h2>Billetera de {{ username }}</h2>
    <div class="row">
      <div class="col" v-for="(amount, cryptoCode) in getWallet" :key="cryptoCode">
        <b>{{ cryptoCode.toUpperCase() }}</b>
        <p>{{ amount?.toFixed(6) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['username']),
    ...mapGetters('transactions', ['getWallet']),
  },
  created() {
    this.getState(this.username);
  },
  methods: {
    ...mapActions('transactions', ['getState']),
  },
};
</script>

<style scoped>
.row {
  max-width: 100%;
  margin: 0px 30px;
}

.col {
  margin-bottom: 5px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
  