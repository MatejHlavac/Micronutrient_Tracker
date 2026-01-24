import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },

    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },

    {
      path: '/add',
      name: 'add',
      component: () => import('../views/AddFoodView.vue'),
    },

    {
      path: '/stats',
      name: 'stats',
      component: () => import('../views/StatsView.vue'),
    },

    {
      path: '/info',
      name: 'info',
      component: () => import('../views/InfoView.vue'),
    }
  ],
})

export default router
