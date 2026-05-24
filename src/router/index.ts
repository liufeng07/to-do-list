import { createRouter, createWebHistory } from 'vue-router'

import TodoPage from '@/views/TodoPage.vue'
import TokenDemoPage from '@/views/TokenDemoPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: TodoPage,
    },
    {
      path: '/token-demo',
      component: TokenDemoPage,
    },
  ],
})

export default router
