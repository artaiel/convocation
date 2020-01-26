import Vue from 'vue'
import Vuex from 'vuex'
import setValue from 'set-value'

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
      Vue.set(state, 'eventData', payload)
    },
    selectDayAsAvailable (state, date) {
      const updatedEventData = { ...state.eventData }
      // console.log('updatedUserDates', updatedEventData)
      const dayAlreadySelected = updatedEventData?.userDates?.[date.year]?.[date.month]?.[date.day]
      if (dayAlreadySelected) {
        // deselect this day
        // setValue(
        //   updatedEventData,
        //   `userDates.${date.year}.${date.month}.${date.day}`,
        //   null
        // )
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
    }
  },
  actions: {
  },
  modules: {
  }
})
