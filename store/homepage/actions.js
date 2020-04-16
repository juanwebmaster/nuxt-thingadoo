export default {
  async list({ commit }, payload) {
    try {
      const data = await this.$api.$get('/homepage')
      commit('SET_EVENTS', {
        for_watching: data.for_watching,
        for_joining: data.for_joining
      })
      commit('SET_CATEGORIES', data.categories)

      return data
    } catch (e) {
      // console.error(e)
    }

    return Promise.resolve()
  }
}
