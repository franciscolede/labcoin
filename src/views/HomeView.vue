<template>
  <div class="home">
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
