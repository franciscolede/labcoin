<template>
    <div class="purchase-home container-xl">
        <div class="row">
            <div class="col-md-6 d-none d-md-block"><img id="purchase-img" src="@/assets/purchase2.png" alt="Persona comprando crypto"></div>
            <div class="col-md-6 btn-div">
              <router-link to="/purchase">
                <img id="arrow" src="@/assets/arrow.png" alt="arrow">
                <p>COMPRÁ CRIPTO!</p>
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
    .row{
        background-color: rgba(77, 146, 127, 0.295);
        height: 350px;
        /* border-bottom-right-radius: 50px;
        border-bottom-left-radius: 50px; */

        display: flex;
      justify-content: center;
      align-items: center;
    }

   

   #purchase-img{
    height: 350px;
    width: 100% ;
    object-fit:contain;
   }

   #arrow{
    height: 150px;
    transition: transform 0.3s;
   }

   #arrow:hover{
    transform: scaleX(1.3);
   }

   #custom-login{
    margin: 10% 0%;
   }

  </style>
    