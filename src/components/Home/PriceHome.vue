<template>
    <div class="price-home container-fluid">
        <div class="row">
            
            <div class="col">
                <img src="@/assets/btc.png" alt="Bitcoin">
                <h5>Bitcoin</h5>
                <h3>Compra: ${{ bitcoinPrice.totalAsk }}</h3>
                <h3>Venta: ${{ bitcoinPrice.totalBid }}</h3>
            </div>

            <div class="col">
                <img src="@/assets/eth.png" alt="Ethereum">
                <h5>Ethereum</h5>
                <h3>Compra: ${{ ethereumPrice.totalAsk }}</h3>
                <h3>Venta: ${{ ethereumPrice.totalBid }}</h3>
            </div>

            <div class="col">
                <img src="@/assets/usdc.png" alt="USD Coin">
                <h5>USD Coin</h5>
                <h3>Compra: ${{ usdcPrice.totalAsk }}</h3>
                <h3>Venta: ${{ usdcPrice.totalBid }}</h3>
            </div>

            <div class="col">
                <img src="@/assets/usdt.png" alt="Tether USDt">
                <h5>Tether USDt</h5>
                <h3>Compra: ${{ usdtPrice.totalAsk }}</h3>
                <h3>Venta: ${{ usdtPrice.totalBid }}</h3>
            </div>
        </div>
    </div>
</template>
    
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters('criptos', [
      'getBitcoinPrice',
      'getEthereumPrice',
      'getUsdcPrice',
      'getUsdtPrice',
    ]),
    bitcoinPrice() {
      return this.getBitcoinPrice;
    },
    ethereumPrice() {
      return this.getEthereumPrice;
    },
    usdcPrice() {
      return this.getUsdcPrice;
    },
    usdtPrice() {
      return this.getUsdtPrice;
    },
  },
  methods: {
    ...mapActions('criptos', ['fetchCryptosPrices']),
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
        /* border-bottom-right-radius: 50px;
        border-bottom-left-radius: 50px; */

        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 10px;
    }

    img{
        height: 100px;
    }

  </style>
    