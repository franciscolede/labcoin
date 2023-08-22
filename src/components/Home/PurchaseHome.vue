<template>
    <div class="purchase-home container-xl">
        <div class="row">
            <div class="col"><img src="@/assets/purchase2.png" alt="logo vue"></div>
            <div class="col btn-div">
                <button><p>Compra!</p></button>
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
        /* background-color: rgba(18, 32, 28, 0.952); */
        height: 350px;
        /* border-bottom-right-radius: 50px;
        border-bottom-left-radius: 50px; */
    }

    .btn-div {
      display: flex;
      justify-content: center; /* Centrar horizontalmente el botón */
      align-items: center; /* Centrar verticalmente el botón */
    }

   img{
    height: 350px;
   }

   #custom-login{
    margin: 10% 0%;
   }

  </style>
    