<template>
    <div class="container">
        <div class="container">
            <div class="row">
              <div class="col">Cripto</div>
              <div class="col">Cantidad</div>
              <div class="col">Dinero</div>
            </div>
            <div class="row">
              <div class="col">BTC:</div>
              <div class="col"><p>{{ userBTC.toFixed(6) }}</p></div>
              <div class="col">{{ pesosBTC }}</div>
            </div>
            <div class="row">
              <div class="col">ETH:</div>
              <div class="col"><p>{{ userETH.toFixed(6) }}</p></div>
              <div class="col">{{ pesosETH }}</div>
            </div>
            <div class="row">
              <div class="col">USDC:</div>
              <div class="col"><p>{{ userUSDC.toFixed(6) }}</p></div>
              <div class="col">{{ pesosUSDC }}</div>
            </div>
            <div class="row">
              <div class="col">USDT:</div>
              <div class="col"><p>{{ userUSDT.toFixed(6) }}</p></div>
              <div class="col">{{ pesosUSDT }}</div>
            </div>
            <div class="row">
              <div class="col">TOTAL:</div>
              <div class="col"></div>
              <div class="col"> {{totalPesos}} </div>
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

      transactions: [],
    }
  },

  created() {
    this.getHistory(this.username)
      .then((response) => {
        this.transactions = response;
        this.addTransactions(this.transactions);
      })
      .catch((error) => {
        console.error('Error al obtener el historial:', error);
      });
  },

  computed: {
    ...mapGetters(['username']),
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

    pesosBTC() {
    const calculatedValue = (this.userBTC * this.bitcoinPrice.bid).toFixed(2);
    return this.formatNumber(calculatedValue);
    },

    pesosETH() {
    const calculatedValue = (this.userETH * this.ethereumPrice.bid).toFixed(2);
    return this.formatNumber(calculatedValue);
    },

    pesosUSDC() {
    const calculatedValue = (this.userUSDC * this.usdcPrice.bid).toFixed(2);
    return this.formatNumber(calculatedValue);
    },

    pesosUSDT() {
    const calculatedValue = (this.userUSDT * this.usdtPrice.bid).toFixed(2);
    return this.formatNumber(calculatedValue);
    },

    totalPesos() {
    const total = (this.userBTC * this.bitcoinPrice.bid) +
                (this.userETH * this.ethereumPrice.bid) +
                (this.userUSDC * this.usdcPrice.bid) +
                (this.userUSDT * this.usdtPrice.bid);
    return this.formatNumber(total.toFixed(2));
},
  },

  methods: {
    ...mapActions('transactions', ['getHistory']),

    addTransactions(transactions) {
      for (const transaction of transactions) {
        if (transaction.crypto_code === 'btc') {
          this.userBTC += parseFloat(transaction.crypto_amount);
        } else if (transaction.crypto_code === 'eth') {
          this.userETH += parseFloat(transaction.crypto_amount);
        } else if (transaction.crypto_code === 'usdc') {
          this.userUSDC += parseFloat(transaction.crypto_amount);
        } else if (transaction.crypto_code === 'usdt') {
          this.userUSDT += parseFloat(transaction.crypto_amount);
        }
      }
    },

    formatNumber(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    },
  },
};
</script>

<style scoped>
</style>
