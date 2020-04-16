export default {
  async list({ commit, state }, payload) {
    try {
      const data = await this.$api.$get('/possibilities/index', {
        params: state.filters
      })
      commit('SET_LIST', data.possibilites)
      return data.possibilites
    } catch (e) {
      // console.error(e)
    }

    return Promise.resolve()
  },

  set_filters({ commit }, payload) {
    commit('SET_FILTER', payload)
  },

  async getById({ commit }, payload) {
    try {
      const data = await this.$api.$get(`/possibilities/${payload.id}`)
      commit('SET_DETAIL', data)
      return data
    } catch (e) {
      // console.error(e)
    }

    return Promise.resolve()
  }
}
