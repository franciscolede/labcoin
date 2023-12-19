<template>
  <div class="price-home container-fluid">
    <div class="row">
      <div v-for="crypto in cryptoList" :key="crypto.code" class="col">
        <img :src="require(`@/assets/${crypto.code}.png`)" :alt="crypto.name">
        <h5>{{ crypto.name }}</h5>
        <h3>Compra: ${{ formatNumber(crypto.price.totalBid) }}</h3>
        <h3>Venta: ${{ formatNumber(crypto.price.totalAsk) }}</h3>
      </div>
    </div>
  </div>
</template>
    
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters('criptos', ['getBTCPrice', 'getETHPrice', 'getUSDCPrice', 'getUSDTPrice']),
    cryptoList() {
      return [
        { code: 'btc', name: 'Bitcoin', price: this.getBTCPrice },
        { code: 'eth', name: 'Ethereum', price: this.getETHPrice },
        { code: 'usdc', name: 'USD Coin', price: this.getUSDCPrice },
        { code: 'usdt', name: 'Tether USDt', price: this.getUSDTPrice },
      ];
    },
  },
  methods: {
    ...mapActions('criptos', ['fetchCryptosPrices']),

    formatNumber(number) {
    const numStr = number.toString();
    const parts = numStr.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return parts.join(',');
  }
  },
  created() {
    this.fetchCryptosPrices();
  },
};
</script>
    
  <style scoped>

    h5{
        color: rgb(0, 0, 0);
        font-family: 'Kollektif', sans-serif;
        font-size: 25px;
        margin: 0;
    }
    h3{
        color: rgb(80, 80, 80);
        font-size: 20px;
    }
    .row{
        background-color: rgb(184, 224, 210);
        min-height: 150px;

        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 10px;
    }

    img{
        height: 100px;
    }

  </style>
    