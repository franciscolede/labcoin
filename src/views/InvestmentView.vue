<template>
    <div class="Investment-page">
      <h1>Análisis de inversiones de {{ username }}</h1>
      <investmentComponent></investmentComponent>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  import investmentComponent from '../components/actionsComponents/investmentComponent.vue'; 
  
  export default {
    name: "InvestmentView",
    components: {
      investmentComponent,
    },
    computed: {
    ...mapGetters(['username']),
  },
  }
  ;
  </script>
  
  <style scoped>
  </style>
  