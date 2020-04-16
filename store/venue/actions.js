export default {
  async list({ commit }, payload) {
    try {
      const data = await this.$api.$get('/listings/index')
      commit('SET_LIST', data.possibilites)
      return data.listings
    } catch (e) {
      // console.error(e)
    }

    return Promise.resolve()
  },

  async getById({ commit }, payload) {
    try {
      const data = await this.$api.$get(`/listings/${payload.id}`)
      commit('SET_DETAIL', data)
      return data
    } catch (e) {
      // console.error(e)
    }

    return Promise.resolve()
  }
}
