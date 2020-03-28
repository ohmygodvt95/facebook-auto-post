import Vue from 'vue'
import Vuex from 'vuex'
import { snackbar } from './snackbar'
import { message } from './message'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    snackbar: snackbar,
    message: message
  }
})
