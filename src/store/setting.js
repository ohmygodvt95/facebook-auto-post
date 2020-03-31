export const setting = {
  namespaced: true,
  state: {
    delay: localStorage.getItem('setting.delay') || 1000
  },
  mutations: {
    setDelay (state, payload) {
      state.delay = payload.delay
      localStorage.setItem('setting.delay', payload.delay)
    }
  }
}
