import { createRouter, createWebHistory } from 'vue-router'
import { RouteName } from '@/enums/route-name'
import RandomUser from '../views/random-user.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouteName.RANDOMUSER,
      component: RandomUser,
    },
  ],
})

export default router
