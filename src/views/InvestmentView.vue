<template>
    <div class="Investment-page">
      <Wallet/>
      <h1>Análisis de inversiones de {{ username }}</h1>
      <investmentComponent></investmentComponent>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  import investmentComponent from '../components/actionsComponents/investmentComponent.vue'; 
  import Wallet from '../components/wallet.vue'; 
  
  export default {
    name: "InvestmentView",
    components: {
      investmentComponent,
      Wallet
    },
    computed: {
    ...mapGetters(['username']),
  },
  }
  ;
  </script>
  
  <style scoped>
  </style>
  