<template>
  <div class="home">
    <LoginHome/>
    <PurchaseHome/>
    <SaleHome/>
    <UserOptionsHome/>
  </div> 
</template>

<script>
import { mapGetters} from 'vuex';
import LoginHome from '../components/Home/LoginHome.vue'; 
import PurchaseHome from '../components/Home/PurchaseHome.vue'; 
import SaleHome from '../components/Home/SaleHome.vue'; 
import UserOptionsHome from '../components/Home/UserOptionsHome.vue'; 

export default {
  name: 'HomeView',
  components: {
    LoginHome,
    PurchaseHome,
    SaleHome,
    UserOptionsHome,
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
    /* row-gap: 30px; */
  }

</style>
