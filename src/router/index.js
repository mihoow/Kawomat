import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TestView from '../views/TestView.vue'
import MenuView from '../views/MenuView.vue'
import Layout from '../views/Layout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/test',
      name: 'test',
      component: TestView,
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/menu',
          name: 'menu',
          component: MenuView,
        },
      ],
    },
  ],
})

export default router
