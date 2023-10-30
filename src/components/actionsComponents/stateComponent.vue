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
            <div class="col right">${{ formatNumber((userBTC * pesosBTC).toFixed(2))  }}</div>
          </div>
          <div class="row">
            <div class="col left">ETH:</div>
            <div class="col"><p>{{ userETH.toFixed(6) }}</p></div>
            <div class="col right">${{ formatNumber((userETH * pesosETH).toFixed(2))  }}</div>
          </div>
          <div class="row">
            <div class="col left">USDC:</div>
            <div class="col"><p>{{ userUSDC.toFixed(6) }}</p></div>
            <div class="col right">${{ formatNumber((userUSDC * pesosUSDC).toFixed(2))  }}</div>
          </div>
          <div class="row">
            <div class="col left">USDT:</div>
            <div class="col"><p>{{ userUSDT.toFixed(6) }}</p></div>
            <div class="col right">${{ formatNumber((userUSDT * pesosUSDT).toFixed(2))  }}</div>
          </div>
          <div class="row">
            <div class="col left">TOTAL:</div>
            <div class="col"></div>
            <div class="col right"> ${{ formatNumber(totalPesos.toFixed(2)) }}</div>
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

    pesosBTC: 0,
    pesosETH: 0,
    pesosUSDC: 0,
    pesosUSDT: 0,

    totalPesos: 0,
  };
},

created() {
  this.fetchState();
},

computed: {
  ...mapGetters(['username']),
  ...mapGetters('criptos', [
      'getBitcoinPrice',
      'getEthereumPrice',
      'getUsdcPrice',
      'getUsdtPrice',
    ]),
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

          this.pesosBTC = this.getBitcoinPrice.ask;
          this.pesosETH = this.getEthereumPrice.ask;
          this.pesosUSDC = this.getUsdcPrice.ask;
          this.pesosUSDT = this.getUsdtPrice.ask;
          this.totalPesos =
            this.userBTC * this.pesosBTC +
            this.userETH * this.pesosETH +
            this.userUSDC * this.pesosUSDC +
            this.userUSDT * this.pesosUSDT;
        })
        .catch((error) => {
          console.error('Error al obtener el estado de la cuenta:', error);
        });
    },

    formatNumber(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    },
},
};
</script>

<style scoped>
.left {
text-align: end;
}
</style>
