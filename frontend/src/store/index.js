import Vue from 'vue'
import Vuex from 'vuex'
import setValue from 'set-value'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    eventData: {},
    localEventData: {},
    usernameInEvent: null,
    isLoaderVisible: false,
    isErrorPopupVisible: false,
    userLoggedIn: false
  },
  mutations: {
    toggleLoader (state) {
      state.isLoaderVisible = !state.isLoaderVisible
    },
    saveEventData (state, payload) {
      Vue.set(state, 'eventData', payload)
      const existingUser = payload.attendees.find(user => user.userId === payload.userId)
      const existingUsername = existingUser ? existingUser.name : null
      if (existingUsername) {
        Vue.set(state, 'usernameInEvent', existingUsername)
      } else {
        Vue.set(state, 'usernameInEvent', payload.userName)
      }
    },
    selectDayAsAvailable (state, date) {
      const updatedEventData = { ...state.eventData }
      const dayAlreadySelected = updatedEventData?.userDates?.[date.year]?.[date.month]?.[date.day]
      if (dayAlreadySelected) {
        Vue.delete(state.eventData.userDates[date.year][date.month], date.day)
        // cleanup empty month
        const numberOfMonthsEntries = Object.entries(state.eventData.userDates[date.year][date.month]).length
        if (numberOfMonthsEntries === 0) Vue.delete(state.eventData.userDates[date.year], date.month)
        // cleanup empty year
        const numberOfYearsEntries = Object.entries(state.eventData.userDates[date.year]).length
        if (numberOfYearsEntries === 0) Vue.delete(state.eventData.userDates, date.year)
      } else {
        setValue(
          updatedEventData,
          `userDates.${date.year}.${date.month}.${date.day}`,
          {
            attendees: [
              {
                userId: 'myUserId',
                time: ''
              }
            ]
          }
        )
      }
      Vue.set(state, 'eventData', updatedEventData)
    },
    updateUsernameInEvent (state, updatedUsername) {
      state.usernameInEvent = updatedUsername
    },
    setUserLoggedInState (state, value) {
      state.userLoggedIn = value
    }
  },
  actions: {
  },
  modules: {
  }
})
