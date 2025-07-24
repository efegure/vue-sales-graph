import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/chart',
      name: 'chart',
      component: () => import('../views/ChartView.vue'),
    },
  ],
})

export default router
