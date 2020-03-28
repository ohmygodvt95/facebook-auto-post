import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'splash',
    component: require('@/views/Splash.vue').default
  },
  {
    path: '/guide',
    name: 'guide',
    component: require('@/views/Guide.vue').default
  },
  {
    path: '/account',
    name: 'account',
    component: require('@/views/pages/Account.vue').default
  },
  {
    path: '/pages',
    component: require('@/layouts/Default.vue').default,
    children: [
      {
        path: 'home',
        name: 'home',
        component: require('@/views/pages/Home.vue').default
      },
      {
        path: 'about',
        name: 'about',
        component: require('@/views/pages/About.vue').default
      },
      {
        path: 'settings',
        name: 'settings',
        component: require('@/views/pages/Setting.vue').default
      },
      {
        path: 'account',
        name: 'account2',
        component: require('@/views/pages/Account.vue').default
      }
    ]
  },
  {
    path: '/*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
