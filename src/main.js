// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './util/http'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui-message/dist/muse-ui-message.css'
import Message from 'muse-ui-message'

import leftTab from '@/components/leftTab'
import list from '@/components/list'
Vue.use({install: function(Vue){
    Vue.component('leftTab',leftTab)
    Vue.component('list',list)
  }
})

Vue.prototype.$axios = axios
Vue.prototype.ServiceUrl = 'http://test.cqfuyuan.cn:8089'
Vue.config.productionTip = false
Vue.use(MuseUI)
Vue.use(Message)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
