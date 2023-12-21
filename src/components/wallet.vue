<template>
  <Loading v-if="loading"></Loading>
  <div v-if="!loading">
    <h2>Billetera de {{ username }}</h2>
    <div class="row">
      <div v-if="Object.keys(getWallet).length === 0">
        <p>No hay elementos en la billetera.</p>
      </div>
      <div v-else class="col" v-for="(amount, cryptoCode) in getWallet" :key="cryptoCode">
        <b>{{ cryptoCode.toUpperCase() }}</b>
        <p>{{ amount}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Loading from './loading.vue';

export default {
  components: {
    Loading,
  },
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    ...mapGetters(['username']),
    ...mapGetters('transactions', ['getWallet']),
  },
  async created() {
    try {
      this.loading = true;
      await this.getState(this.username);
    } catch (error) {
      console.error('Error:', error);

    } finally {
      this.loading = false;
    }
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
  