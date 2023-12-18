<template>
  <div>
    <h2>Billetera de {{ username }}</h2>
    <div class="row">
      <div v-if="Object.keys(getWallet).length === 0">
        <p>No hay elementos en la billetera.</p>
      </div>
      <div v-else>
        <div class="col" v-for="(amount, cryptoCode) in getWallet" :key="cryptoCode">
          <b>{{ cryptoCode.toUpperCase() }}</b>
          <p>{{ amount?.toFixed(6) }}</p>
        </div>
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

.empty {
  margin: 0px;
  padding: 0px;
}
</style>
  