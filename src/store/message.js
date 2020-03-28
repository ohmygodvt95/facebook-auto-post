export const message = {
  namespaced: true,
  state: {
    footerMessage: '',
    notificationMessage: ''
  },
  mutations: {
    showFooterMessage (state, payload) {
      state.footerMessage = payload.message
    },
    showNotificationMessage (state, payload) {
      state.notificationMessage = payload.message
    }
  }
}
