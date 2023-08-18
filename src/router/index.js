import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PurchaseView from '../views/PurchaseView.vue'
import SaleView from '../views/SaleView.vue'
import HistoryView from '../views/HistoryView.vue'
import LoginView from '../views/LoginView.vue'
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
    meta: { requiresAuth: true } // Require authentication
  },
  {
    path: '/sale',
    name: 'sale',
    component: SaleView,
    meta: { requiresAuth: true } // Require authentication
  },
  {
    path: '/history',
    name: 'history',
    component: HistoryView,
    meta: { requiresAuth: true } // Require authentication
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { requiresGuest: true } // Allow only unauthenticated access
  }
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
