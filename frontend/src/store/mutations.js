import Vue from 'vue'
import setValue from 'set-value'
import { isLoggedIn } from '@/lib/auth.js'

export default {
  toggleLoader (state) {
    state.isLoaderVisible = !state.isLoaderVisible
  },
  saveMeetingDate (state, day) {
    let updatedEventData = { ...state.eventData }
    const date = day.split('-')
    const daySelected = updatedEventData?.userDates?.[date[2]]?.[date[1]]?.[date[0]]
    if (daySelected && daySelected.selected) {
      updatedEventData.userDates[date[2]][date[1]][date[0]].selected = false
    } else if (daySelected) {
      updatedEventData.userDates[date[2]][date[1]][date[0]].selected = true
    } else {
      setValue(
        updatedEventData,
        `userDates.${date[2]}.${date[1]}.${date[0]}`,
        { selected: true }
      )
    }
    Vue.set(state, 'eventData', updatedEventData)
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
  saveUserData (state, payload) {
    Vue.set(state, 'userInfo', payload)
  },
  selectDayAsAvailable (state, date) {
    const updatedEventData = { ...state.eventData }
    const dayAlreadySelected = updatedEventData?.userDates?.[date.year]?.[date.month]?.[date.day]?.attendees
    if (dayAlreadySelected) {
      Vue.delete(state.eventData.userDates[date.year][date.month][date.day], 'attendees')
      if (!state.eventData.userDates[date.year][date.month][date.day].selected) {
        Vue.delete(state.eventData.userDates[date.year][date.month], [date.day])
      }
      // cleanup empty month
      const numberOfMonthsEntries = Object.entries(state.eventData.userDates[date.year][date.month]).length
      // console.log(state.eventData.userDates)
      // console.log('numberOfMonthsEntries', numberOfMonthsEntries)
      if (numberOfMonthsEntries === 0) Vue.delete(state.eventData.userDates[date.year], date.month)
      // cleanup empty year
      const numberOfYearsEntries = Object.entries(state.eventData.userDates[date.year]).length
      // console.log('numberOfYearsEntries', numberOfYearsEntries)
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
          ],
          selected: updatedEventData?.userDates?.[date.year]?.[date.month]?.[date.day]?.selected
        }
      )
    }
    Vue.set(state, 'eventData', updatedEventData)
  },
  updateUsernameInEvent (state, updatedUsername) {
    state.usernameInEvent = updatedUsername
  },
  updateUsername (state, username) {
    state.userInfo.userData.username = username
  },
  updateEmail (state, email) {
    state.userInfo.userData.email = email
  },
  updateEventTitle (state, payload) {
    state.userInfo.eventsOwned[payload.eventIndex].eventName = payload.title
  },
  updateEventDescription (state, payload) {
    state.userInfo.eventsOwned[payload.eventIndex].description = payload.description
  },
  updateEventEmailNotifications (state, payload) {
    state.userInfo.eventsOwned[payload.eventIndex].emailNotifications = payload.emailNotifications
  },
  updateEventWebhook (state, payload) {
    state.userInfo.eventsOwned[payload.eventIndex].webhookUrl = payload.webhook
  },
  updateTimeAvailability (state, timeData) {
    const date = timeData.date.split('-')
    date[1] = date[1] - 1
    state.eventData.userDates[date[2]][date[1]][date[0]].attendees[0].time = timeData.updatedTime
  },
  updateUserLoggedInState (state) {
    state.userLoggedIn = isLoggedIn()
  },
  clearUserData (state) {
    state.userInfo = {}
  },
  clearEventData (state) {
    state.eventData = {}
  },
  showPopup (state, payload) {
    Vue.set(state, 'popup', {
      info: payload.info,
      isError: payload.isError,
      visible: true
    })
  },
  hidePopup (state) {
    Vue.set(state, 'popup', {
      info: null,
      isError: null,
      visible: false
    })
  },
  setEventNotificationLanguage (state, payload) {
    state.userInfo.eventsOwned[payload.eventIndex].notificationLanguage = payload.locale
  }
}