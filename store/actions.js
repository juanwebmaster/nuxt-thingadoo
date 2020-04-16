export default {
  setModalUserSection({ commit }, payload) {
    try {
      commit('SET_MODAL_USER', payload)
      return payload
    } catch (e) {
      // console.error(e)
    }
  }
}
