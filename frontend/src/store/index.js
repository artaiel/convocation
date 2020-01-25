import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    eventData: null,
    localEventData: null,
    isLoaderVisible: false,
    isErrorPopupVisible: false
  },
  mutations: {
    toggleLoader (state) {
      state.isLoaderVisible = !state.isLoaderVisible
    }
  },
  actions: {
  },
  modules: {
  }
})
