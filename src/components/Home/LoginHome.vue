<template>
    <div v-if="!isLoggedIn" class="login-home container-fluid">
        <div class="row">
            <div class="col d-none d-md-block"><img src="@/assets/full-logo.png" alt="logo vue"></div>
            <div class="col login-comp">
                <login></login>
            </div>
        </div>
    </div>
  </template>
    
  <script>
    import { mapGetters} from 'vuex';
    import Login from '@/components/Login.vue'; 
    export default {
    computed: {
      ...mapGetters(['getUsername', 'isLoggedIn'])
    },
    components: {
        Login
    }
  }
  </script>
    
  <style scoped>
    .row{
        background-color: rgba(18, 32, 28, 0.952);
        height: 350px;
    }

   img{
    height: 80%;
   }

   .login-comp{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
   }

  </style>
    