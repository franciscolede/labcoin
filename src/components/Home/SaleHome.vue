<template>
    <div class="sale-home container-xl">
        <div class="row">
            <div class="col-md-6 btn-div">
              <router-link to="/sale">
                <img id="arrow" src="@/assets/arrow.png" alt="">
                <p>VENDÉ CRIPTO!</p>
            </router-link>
            </div>
            <div class="col-md-6 d-none d-md-block"><img id="sale-img" src="@/assets/sale.png" alt="Persona vendiendo crypto"></div>
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
        display: flex;
      justify-content: center;
      align-items: center;
    }


   #sale-img{
    height: 350px;
    width: 100% ;
    object-fit:contain;
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
    