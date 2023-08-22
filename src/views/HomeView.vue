<template>
  <div class="home">
    <LoginHome/>
    <PurchaseHome/>
  </div> 
</template>

<script>
import { mapGetters} from 'vuex';
import LoginHome from '../components/Home/LoginHome.vue'; 
import PurchaseHome from '../components/Home/PurchaseHome.vue'; 

export default {
  name: 'HomeView',
  components: {
    LoginHome,
    PurchaseHome,
  },
  computed: {
    ...mapGetters(['username'])
  }
}
</script>

<style scoped>
  .home{
    display: flex;
    flex-direction: column;
    row-gap: 30px;
  }

</style>
