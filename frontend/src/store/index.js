import Vue from 'vue'
import Vuex from 'vuex'
import actions from '@/store/actions'
import mutations from '@/store/mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    eventData: {},
    userInfo: {
      eventsAttending: [],
      eventsOwned: [],
      userData: {}
    },
    localEventData: {},
    usernameInEvent: null,
    isLoaderVisible: false,
    isErrorPopupVisible: false,
    userLoggedIn: false,
    popup: {
      info: 'null',
      isError: null,
      visible: false
    }
  },
  mutations,
  getters: {
    isEventOwner (state) {
      return state.eventData.ownerId === state.eventData.userId
    }
  },
  actions,
})
