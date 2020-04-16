import {
  SET_LIST,
  SET_DETAIL,
  SET_ITEM,
  SET_DETAIL_VISIBILITY,
  SET_ITEM_VISIBILITY
} from './types'

export default {
  [SET_LIST](state, payload) {
    state.categories = payload
  },
  [SET_DETAIL](state, payload) {
    state.category = payload
  },
  [SET_ITEM](state, payload) {
    state.item = payload
  },
  [SET_DETAIL_VISIBILITY](state, payload) {
    state.display = payload
  },
  [SET_ITEM_VISIBILITY](state, payload) {
    state.display.activeItemType = payload.itemType
    state.display.activeItemId = payload.itemId
    state.display.itemActive = payload.itemActive
  }
}
