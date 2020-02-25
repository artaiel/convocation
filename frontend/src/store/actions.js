// import Vue from 'vue'
// import Vuex from 'vuex'
import apiClient from '@/lib/APIClient'

export default {
  async getUserData ({ commit }) {
    commit('toggleLoader')
    try {
      const response = await apiClient.call('getUserData')
      const responseData = await response.json()
      commit('saveUserData', responseData)
    } catch (err) {
      commit('showPopup', { info: 'errorGeneric', isError: true })
    } finally {
      commit('toggleLoader')
    }
  }
}