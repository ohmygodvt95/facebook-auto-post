import store from '../store'
import Vue from 'vue'

function install (Vue, opts) {
  Vue.prototype.$notifier = {
    showMessage: ({ content = '', color = 'info' }) => {
      store.commit('snackbar/showMessage', { content, color })
    },
    showFooterMessage: ({ message = '' }) => {
      store.commit('message/showFooterMessage', { message })
    },
    showNotificationMessage: ({ message = '' }) => {
      store.commit('message/showNotificationMessage', { message })
    }
  }
}

export default Vue.use(install)
