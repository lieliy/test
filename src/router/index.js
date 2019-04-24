import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/view/login'
import Home from '@/view/home'
import CheckUser from '@/view/check/user'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/check/user',
      name: 'check',
      component: CheckUser
      // children: [
      //   {
      //     path: '/user',
      //     component: CheckUser
      //   }
      // ]
    }
  ]
})
