import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PurchaseView from '../views/PurchaseView.vue'
import SaleView from '../views/SaleView.vue'
import HistoryView from '../views/HistoryView.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/purchase',
    name: 'purchase',
    component: PurchaseView
  },
  {
    path: '/sale',
    name: 'sale',
    component: SaleView
  },
  {
    path: '/history',
    name: 'history',
    component: HistoryView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
