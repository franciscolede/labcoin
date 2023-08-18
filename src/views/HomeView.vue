<template>
  <div class="home">
    <h1>HOLA</h1>
    <LoginHome>
    </LoginHome>
  </div> 
</template>

<script>
import { mapGetters} from 'vuex';
import LoginHome from '../components/LoginHome.vue'; 

export default {
  name: 'HomeView',
  components: {
    LoginHome
  },
  computed: {
    ...mapGetters(['username'])
  }
}
</script>
