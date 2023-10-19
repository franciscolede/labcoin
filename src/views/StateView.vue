<template>
    <div class="state-page">
      <h1>Análisis del estado actual de {{ username }}</h1>
      <stateComponent></stateComponent>
      <PriceHome></PriceHome>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  import stateComponent from '../components/actionsComponents/stateComponent.vue'; 
  import PriceHome from '../components/Home/PriceHome.vue'; 
  
  export default {
    name: "StateView",
    components: {
      stateComponent,
      PriceHome,
    },
    computed: {
    ...mapGetters(['username']),
  },
  }
  ;
  </script>
  
  <style scoped>
  </style>
  