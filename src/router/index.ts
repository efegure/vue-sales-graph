import { inject } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import type { Store } from 'vuex'
import type { RootState } from '../store/types'

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

router.beforeEach((to, from, next) => {
  const store: Store<RootState> | undefined = inject('store')
  if (
    to.name !== 'login' &&
    (!store ||
      !store.getters.getAccessToken ||
      new Date(store.getters.getTokenExpiration).getTime() < new Date().getTime())
  ) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
