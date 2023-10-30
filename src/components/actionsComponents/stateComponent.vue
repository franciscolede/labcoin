<template>
  <div class="container">
      <div class="container">
          <div class="row">
            <div class="col left">Cripto</div>
            <div class="col">Cantidad</div>
            <div class="col right">Dinero</div>
          </div>
          <div class="row">
            <div class="col left">BTC:</div>
            <div class="col"><p>{{ userBTC.toFixed(6) }}</p></div>
          </div>
          <div class="row">
            <div class="col left">ETH:</div>
            <div class="col"><p>{{ userETH.toFixed(6) }}</p></div>
          </div>
          <div class="row">
            <div class="col left">USDC:</div>
            <div class="col"><p>{{ userUSDC.toFixed(6) }}</p></div>
          </div>
          <div class="row">
            <div class="col left">USDT:</div>
            <div class="col"><p>{{ userUSDT.toFixed(6) }}</p></div>
          </div>
          <div class="row">
            <div class="col left">TOTAL:</div>
            <div class="col"></div>
          </div>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
data() {
  return {
    userBTC: 0,
    userETH: 0,
    userUSDC: 0,
    userUSDT: 0,
  };
},

created() {
  this.fetchState(); // Llama a la acción Vuex para obtener el estado de la cuenta.
},

computed: {
  ...mapGetters(['username']),

  
},

methods: {
  ...mapActions('transactions', ['getState']), // Mapea la acción desde el módulo Vuex.

  fetchState() {
    this.getState(this.username)
      .then((response) => {
        this.userBTC = response.BTC;
        this.userETH = response.ETH;
        this.userUSDC = response.USDC;
        this.userUSDT = response.USDT;
      })
      .catch((error) => {
        console.error('Error al obtener el estado de la cuenta:', error);
      });
  },
},
};
</script>

<style scoped>
.left {
text-align: end;
}
</style>
