import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/Home.vue'
import Stats from './views/Stats.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/stats',
    name: 'Stats',
    component: Stats
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
