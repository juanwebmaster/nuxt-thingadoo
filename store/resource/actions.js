export default {
  async list({ commit }, payload) {
    try {
      const data = await this.$api.$get('/resources/index')
      commit('SET_LIST', data.resources)
      return data.resources
    } catch (e) {
      // console.error(e)
    }

    return Promise.resolve()
  },

  async getById({ commit }, payload) {
    try {
      const data = await this.$api.$get(`/resources/${payload.id}`)
      commit('SET_DETAIL', data)
      return data
    } catch (e) {
      // console.error(e)
    }

    return Promise.resolve()
  }
}
