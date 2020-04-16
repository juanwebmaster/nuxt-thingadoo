import {
  SET_BREAKPOINTS,
  SET_DISPLAY,
  SET_MENU_VISIBILITY,
  SET_DETAIL_VISIBILITY
} from './types'

export default {
  [SET_BREAKPOINTS](state, payload) {
    state.breakpoints = payload
  },
  [SET_DISPLAY](state, payload) {
    state.display = payload
  },
  [SET_MENU_VISIBILITY](state, payload) {
    state.display.menuVisible = payload
  },
  [SET_DETAIL_VISIBILITY](state, payload) {
    state.display.detailVisible = payload
  }
}
