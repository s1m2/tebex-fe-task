import { createRouter, createWebHistory } from 'vue-router'

import CheckoutView from './views/CheckoutView.vue';

const routes = [
  { path: '/', component: CheckoutView },
  { path: '/success', component: () => import('./views/SuccessView.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router