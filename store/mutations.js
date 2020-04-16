import { SET_MODAL_USER } from './types'

export default {
  [SET_MODAL_USER](state, payload) {
    state.modalUser = payload
  }
}
