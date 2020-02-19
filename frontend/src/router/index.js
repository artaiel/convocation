import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    children: [
      {
        path: '',
        component: () => import('@/components/CreateEvent')
      },
      {
        path: '/created',
        component: () => import('@/components/EventCreated')
      }
    ]
  },
  {
    path: '/my-events',
    name: 'myEvents',
    component: () => import('../views/EventsPanel.vue')
  },
  {
    path: '/event/:id',
    name: 'eventView',
    component: () => import('../views/EventView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
