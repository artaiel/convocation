import Vue from 'vue'
import Vuex from 'vuex'
import apiClient from '@/lib/APIClient'
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
  actions: {
    async getUserData ({ commit }) {
      commit('toggleLoader')
      try {
        const response = await apiClient.call('getUserData')
        const responseData = await response.json()
        commit('saveUserData', responseData)
      } catch (err) {
        console.error(err)
      } finally {
        commit('toggleLoader')
      }
    }
  },
  modules: {
  }
})