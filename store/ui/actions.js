export default {
  set_display({ commit }, payload) {
    commit('SET_DISPLAY', payload)
  },
  set_breakpoints({ commit }, payload) {
    commit('SET_BREAKPOINTS', payload)
  }
}
