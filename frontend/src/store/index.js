import Vue from 'vue'
import Vuex from 'vuex'
import actions from '@/store/actions'
import getters from '@/store/getters'
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
  actions,
  mutations,
  getters
})
