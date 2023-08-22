<template>
    <div class="sale-home container-xl">
        <div class="row">
            <div class="col btn-div">
              <router-link to="/sale">
                <img id="arrow" src="@/assets/arrow.png" alt="">
                <p>VENDÉ CRYPTO!</p>
            </router-link>
            </div>
            <div class="col"><img id="sale-img" src="@/assets/sale.png" alt="Persona vendiendo crypto"></div>
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
    .row{
        background-color: rgba(69, 153, 129, 0.527);
        height: 350px;
        /* border-bottom-right-radius: 50px;
        border-bottom-left-radius: 50px; */
    }

    .btn-div {
      display: flex;
      flex-direction: column;
      justify-content: center; /* Centrar horizontalmente el botón */
      align-items: center; /* Centrar verticalmente el botón */
    }

   #sale-img{
    height: 350px;
   }
   
   #arrow{
    height: 150px;
    transform: scaleX(-1);
    transition: transform 0.3s;
   }

   #arrow:hover{
    transform: scaleX(-1.3);
   }

   #custom-login{
    margin: 10% 0%;
   }

  </style>
    