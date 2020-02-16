const setValue = require('set-value')

exports.extractUserDates = (eventData, userId) => {
  const isOwner = eventData.ownerId.toString() === userId.toString()
  console.log(isOwner)
  let user = {}
  let others = {}

  Object.entries(eventData.dates).forEach(year => {
    Object.entries(year[1]).forEach(month => {
      Object.entries(month[1]).forEach(day => {
        if (day[1].attendees) {
          let otherAttendees = []
          day[1].attendees.forEach(attendee => {
            if (attendee.userId.toString() === userId.toString()) {
              setValue(user, `${year[0]}.${month[0]}.${day[0]}`, { attendees: [ attendee ] })
              // if (isOwner) user[year[0]][month[0]][day[0]].selected = !!day[1].selected
            } else {
              otherAttendees.push(attendee)
            }
          })
          setValue(others, `${year[0]}.${month[0]}.${day[0]}`, { attendees: otherAttendees })
          if (!isOwner) others[year[0]][month[0]][day[0]].selected = !!day[1].selected
        }
        if (day[1].selected && isOwner) {
          setValue(user, `${year[0]}.${month[0]}.${day[0]}.selected`, true)
        }
      })
    })
  })

  return {
    user,
    others
  }
}

exports.mergeUserDates = (otherUsers, updatedUserAvailability, userId, isEventOwner) => {
  const eventDates = otherUsers
  // console.log('-----------------------------------------------------------------------------------------------')
  // console.log('in merge user dates, isOwner: ', isEventOwner)

  Object.entries(updatedUserAvailability).forEach(year => {
    Object.entries(year[1]).forEach(month => {
      Object.entries(month[1]).forEach(day => {
        let userAvailabilityThisDay
        if (day[1].attendees) {
          userAvailabilityThisDay = day[1].attendees[0]
          userAvailabilityThisDay.userId = userId
        }

        const dayRecordExists = eventDates
          && eventDates[year[0]]
          && eventDates[year[0]][month[0]]
          && eventDates[year[0]][month[0]][day[0]]
          && eventDates[year[0]][month[0]][day[0]].attendees

        if (dayRecordExists && userAvailabilityThisDay) {
          eventDates[year[0]][month[0]][day[0]].attendees.push(userAvailabilityThisDay)
        } else if (userAvailabilityThisDay) {
          setValue(eventDates, `${year[0]}.${month[0]}.${day[0]}.attendees`, [userAvailabilityThisDay])
        }
        if (isEventOwner && day[1].selected) {
          setValue(eventDates, `${year[0]}.${month[0]}.${day[0]}.selected`, true)
        }
        // dayRecordExists && userAvailabilityThisDay
        //   ? eventDates[year[0]][month[0]][day[0]].attendees.push(userAvailabilityThisDay)
        //   : setValue(eventDates, `${year[0]}.${month[0]}.${day[0]}.attendees`, [userAvailabilityThisDay])
        // if (isEventOwner && day[1].selected) {
        //   eventDates[year[0]][month[0]][day[0]].selected = true
        // }
        // console.log(`date: ${day[0]} ${month[0]} ${year[0]}`)
        // console.log(day[1])
        // console.log('saved as')
        // console.log(eventDates[year[0]][month[0]][day[0]])
      })
    })
  })

  Object.entries(eventDates).forEach(year => {
    Object.entries(year[1]).forEach(month => {
      Object.entries(month[1]).forEach(day => {
        if (day[1] && day[1].attendees && day[1].attendees.length === 0) delete eventDates[year[0]][month[0]][day[0]].attendees
      })
    })
  })

  return eventDates
}

exports.countDaysAvailable = (attendanceData) => {
  let data = {
    count: 0,
    selectedDates: []
  }
  Object.entries(attendanceData).forEach(year => {
    Object.entries(year[1]).forEach(month => {
      Object.entries(month[1]).forEach(day => {
        if (day[1].attendees && day[1].attendees.length) data.count ++
        if (day[1].selected) data.selectedDates.push(`${day[0]}-${month[0]}-${year[0]}`)
      })
    })
  })
  return data
}

exports.formatDate = (dateString) => {
  const date = dateString.split('-')
  date[1] = +date[1] + 1
  return date.join('.')
}
