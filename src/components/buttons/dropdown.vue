<template>
    <div class="dropdown">
      <button
        class="btn btn-sm btn-outline-success dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {{ username }}
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <router-link to="/history" class="dropdown-item">Historial de movimientos</router-link>
        <!-- <li><a class="dropdown-item" href="#">Lectura, edición y borrado</a></li> -->
        <router-link to="/state" class="dropdown-item">Análisis del estado actual</router-link>
        <router-link to="/investment" class="dropdown-item">Análisis de inversiones</router-link>
      </ul>
    </div>
  </template>
    
  <script>
  import { mapGetters } from 'vuex';
  
  export default {
    computed: {
      ...mapGetters(['username'])
    }
  };
  </script>
    
  <style scoped>
    .btn{
      min-width: 120px;
    }
  </style>
    