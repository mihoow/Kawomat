import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/Layout.vue'
import HomeView from '../views/HomeView.vue'
import TestView from '../views/TestView.vue'
import MenuView from '../views/MenuView.vue'
import CoffeeView from '../views/CoffeeView.vue'

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
        {
          path: '/menu/:id',
          name: 'coffee-details',
          component: CoffeeView,
        },
      ],
    },
  ],
})

export default router
