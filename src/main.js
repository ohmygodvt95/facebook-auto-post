import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import notifier from './plugins/notifier'
import axios from 'axios'
import commons from './helpers/commons'

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  notifier,
  commons,
  render: h => h(App)
}).$mount('#app')
