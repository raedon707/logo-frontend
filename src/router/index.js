import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Leagues',
    component: () => import('../views/Leagues.vue')
  }, {
    path: '/locations',
    name: 'Locations',
    component: () => import('../views/Locations.vue')
  }, {
    path: '/sports',
    name: 'Sports',
    component: () => import('../views/Sports.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
