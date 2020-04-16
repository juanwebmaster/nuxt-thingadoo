import { SET_LIST, SET_DETAIL } from './types'

export default {
  [SET_LIST](state, payload) {
    state.list = payload
  },
  [SET_DETAIL](state, payload) {
    state.detail = payload
  }
}
