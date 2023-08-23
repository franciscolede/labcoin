<template>
  <Navbar/>
  <router-view/>
</template>

<script>
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './components/Navbar.vue'; 

export default {
  components: {
    Navbar 
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

a {
  color: inherit; /* Hereda el color del texto del elemento padre */
  text-decoration: none; /* Elimina el subrayado */
  transition: none; /* Elimina las transiciones */
}

</style>
