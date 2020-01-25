import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    eventData: {},
    localEventData: {},
    isLoaderVisible: false,
    isErrorPopupVisible: false
  },
  mutations: {
    toggleLoader (state) {
      state.isLoaderVisible = !state.isLoaderVisible
    },
    saveEventData (state, payload) {
      console.log('within mutation', payload)
      state.eventData = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
