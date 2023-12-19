<template>
    <div class="Investment-page">
      <Wallet/>
      <h1>Análisis de inversiones de {{ username }}</h1>
      <investmentComponent></investmentComponent>
      <PriceHome></PriceHome>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  import investmentComponent from '../components/actionsComponents/investmentComponent.vue'; 
  import Wallet from '../components/wallet.vue'; 
  import PriceHome from '../components/Home/PriceHome.vue'; 
  
  export default {
    name: "InvestmentView",
    components: {
      investmentComponent,
      Wallet,
      PriceHome
    },
    computed: {
    ...mapGetters(['username']),
  },
  }
  ;
  </script>
  
  <style scoped>
  </style>
  