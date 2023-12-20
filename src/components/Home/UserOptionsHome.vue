<template>
    <div class="user-options-home container-fluid">
        <div class="row">
            
            <div class="col">
                <router-link to="/history">
                <img src="@/assets/historial.png" alt="history">
                <h5>Historial de movimientos.</h5>
                </router-link>
            </div>
            <div class="col">
                <router-link to="/state">
                <img src="@/assets/analisis-actual.png" alt="analisis actual">
                <h5>Análisis del estado actual.</h5>
                </router-link>
            </div>

            <div class="col">
                <router-link to="/investment">
                <img src="@/assets/analisis-inversiones.png" alt="analisis inversiones">
                <h5>Análisis de inversiones.</h5>
                </router-link>
            </div>
        </div>
    </div>
  </template>
    
  <script>
    import { mapGetters} from 'vuex';
    export default {
    computed: {
      ...mapGetters(['getUsername', 'isLoggedIn'])
    },
    components: {
        
    }
  }
  </script>
    
  <style scoped>

    h5{
        color: black;
        font-family: 'Kollektif', sans-serif;
        font-size: 25px;
    }
    .row{
        background-color: rgb(255, 255, 255);
        min-height: 300px;
        /* border-bottom-right-radius: 50px;
        border-bottom-left-radius: 50px; */

        display: flex;
        justify-content: center;
        align-items: center;
    }

    img{
        height: 200px;
    }

    .col{
        filter: grayscale(75%);
    }

    .col:hover{
        filter: grayscale(0%);
    }
  </style>
    