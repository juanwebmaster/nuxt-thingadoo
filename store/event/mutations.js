import { SET_LIST, SET_FILTER, SET_DETAIL } from './types'

export default {
  [SET_LIST](state, payload) {
    state.list = payload
  },
  [SET_FILTER](state, payload) {
    state.filters = payload
  },
  [SET_DETAIL](state, payload) {
    state.detail = payload
  }
}
