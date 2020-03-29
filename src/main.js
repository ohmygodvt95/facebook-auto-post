import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import notifier from './plugins/notifier'
import axios from 'axios'
import commons from './helpers/commons'
import database from './plugins/database'
import VueTimeago from 'vue-timeago'
import VuetifyConfirm from 'vuetify-confirm'
import './helpers/filters'
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(VueTimeago, {
  name: 'Timeago',
  locale: 'vi',
  locales: {
    vi: require('date-fns/locale/vi')
  }
})

Vue.use(VuetifyConfirm, { vuetify })

new Vue({
  router,
  store,
  vuetify,
  notifier,
  commons,
  database,
  render: h => h(App)
}).$mount('#app')
