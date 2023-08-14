<template>
  <Navbar :username="username" :logged="logged"/>
  <router-view :username="username" :logged="logged" />
</template>

<script>
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { mapState } from 'vuex';
import Navbar from './components/Navbar.vue'; 

export default {
  components: {
    Navbar 
  },
  computed: {
    ...mapState(['username', 'logged']),
  },
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
  color: rgb(217, 240, 232);
}

body{
  background-color: rgb(0, 61, 43);
}

</style>
