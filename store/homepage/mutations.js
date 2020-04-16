import { SET_EVENTS, SET_CATEGORIES } from './types'

export default {
  [SET_EVENTS](state, payload) {
    state.watchable_events = payload.for_watching
    state.joinable_events = payload.for_joining
  },
  [SET_CATEGORIES](state, payload) {
    state.categories = payload
  }
}
