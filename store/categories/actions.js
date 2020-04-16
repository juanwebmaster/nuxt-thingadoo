export default {
  async list({ commit }, payload) {
    try {
      const data = await this.$api.$get('/categories/index')
      // eslint-disable-next-line no-console
      commit('SET_LIST', data.categories)
      return data.categories
    } catch (e) {
      // console.error(e)
    }

    return Promise.resolve()
  },

  async getById({ commit }, payload) {
    try {
      const data = await this.$api.$get(`/categories/${payload}`)
      commit('SET_DETAIL', data)
      return data
    } catch (e) {
      // console.error(e)
    }

    return Promise.resolve()
  },

  async loadItem({ commit, store }, payload) {
    try {
      const data = await this.$api.$get(
        `/${payload.itemType}/${payload.itemId}`
      )
      commit('SET_ITEM_VISIBILITY', payload)
      commit('SET_ITEM', data)
      // eslint-disable-next-line no-console
      console.log(data)
      return data
    } catch (e) {
      // console.error(e)
    }

    return Promise.resolve()
  }
}
