<template>
  <div class="home">
    <LoginHome/>
    <PurchaseHome/>
    <SaleHome/>
    <PriceHome/>
    <UserOptionsHome/>
  </div> 
</template>

<script>
import { mapGetters} from 'vuex';
import LoginHome from '../components/Home/LoginHome.vue'; 
import PurchaseHome from '../components/Home/PurchaseHome.vue'; 
import SaleHome from '../components/Home/SaleHome.vue'; 
import UserOptionsHome from '../components/Home/UserOptionsHome.vue';
import PriceHome from '../components/Home/PriceHome.vue'; 

export default {
  name: 'HomeView',
  components: {
    LoginHome,
    PurchaseHome,
    SaleHome,
    UserOptionsHome,
    PriceHome
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
