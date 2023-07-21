<template>
  <Navbar />
  <router-view/>
</template>

<script>
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Navbar from './components/Navbar.vue'; 

export default {
  components: {
    Navbar 
  }
}
</script>

<style>
/* Importar estilos de Bootstrap */
@import '~bootstrap/dist/css/bootstrap.min.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body{
  background-color: #101f0d;
}

</style>
