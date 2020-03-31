export const auth = {
  namespaced: true,
  state: {
    username: localStorage.getItem('auth.username')
  },
  mutations: {
    setUsername (state, payload) {
      state.username = payload.username
      localStorage.setItem('auth.username', payload.username)
    }
  }
}
