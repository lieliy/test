import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/view/login'
import Home from '@/view/home'
import CheckUser from '@/view/check/user'
import CheckCompany from '@/view/check/company'
import CheckBusiness from '@/view/check/business'
import IntegralOrder from '@/view/integral/order'
import IntegralControl from '@/view/integral/control'
import orderCard from '@/view/orderCard'
import orderList from '@/view/orderList'
import Cards from '@/view/cards'
import CardsList from '@/view/cardsList'

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
      component: CheckUser,
      // children: [{
      //   path: 'user',
      //   name: 'chackUser',
      //   component: CheckUser
      // }]
    },
    {
      path: '/check/company',
      name: 'check',
      component: CheckCompany
    },
    {
      path: '/check/business',
      name: 'checkBusiness',
      component: CheckBusiness
    },
    {
      path: '/integral/order',
      name: 'integral',
      component: IntegralOrder
    },
    {
      path: '/integral/control',
      name: 'integral',
      component: IntegralControl
    },
    {
      path: '/orderCard',
      name: 'orderCard',
      component: orderCard
    },
    {
      path: '/orderList',
      name: 'orderList',
      component: orderList
    },
    {
      path: '/cards',
      name: 'Cards',
      component: Cards
    },
    {
      path: '/cardsList',
      name: 'cardsList',
      component: CardsList
    }
  ]
})
