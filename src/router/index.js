import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PurchaseView from '../views/PurchaseView.vue'
import SaleView from '../views/SaleView.vue'
import HistoryView from '../views/HistoryView.vue'
import LoginView from '../views/LoginView.vue'
import StateView from '../views/StateView.vue'
import InvestmentView from '../views/InvestmentView.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/purchase',
    name: 'purchase',
    component: PurchaseView,
    meta: { requiresAuth: true } 
  },
  {
    path: '/sale',
    name: 'sale',
    component: SaleView,
    meta: { requiresAuth: true } 
  },
  {
    path: '/history',
    name: 'history',
    component: HistoryView,
    meta: { requiresAuth: true } 
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { requiresGuest: true } 
  },
  {
    path: '/state',
    name: 'state',
    component: StateView,
    meta: { requiresAuth: true } 
  },
  {
    path: '/investment',
    name: 'investment',
    component: InvestmentView,
    meta: { requiresAuth: true } 
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.isLoggedIn) {
    next('/login');
  } else if (to.meta.requiresGuest && store.state.isLoggedIn) {
    next('/#');
  } else {
    next();
  }
});

export default router
