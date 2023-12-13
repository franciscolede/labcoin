<template>
  <div id="app">
    <Navbar />
    <router-view/>
    <FooterApp/>
  </div>
</template>

<script>
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './components/Navbar.vue'; 
import FooterApp from './components/footer.vue'; 

export default {
  created() {
    document.title = "LABCOIN";
  },
  components: {
    Navbar,
    FooterApp,
  },
}
</script>

<style>
/* Importar estilos de Bootstrap */
@import '~bootstrap/dist/css/bootstrap.min.css';

@font-face {
  font-family: 'Kollektif';
  src: url('../src/assets/fonts/Kollektif.ttf') format('truetype');
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(217, 240, 232);

  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

body{
  background-color: rgb(0, 61, 43);
}

a {
  color: inherit; /* Hereda el color del texto del elemento padre */
  text-decoration: none; /* Elimina el subrayado */
  transition: none; /* Elimina las transiciones */
}

#content {
  flex: 1; /* Permite que el contenido ocupe el espacio restante */
}

#footer {
  flex-shrink: 0; /* Evita que el footer se contraiga cuando el contenido es pequeño */
}

</style>
