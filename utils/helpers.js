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
              if (isOwner) user[year[0]][month[0]][day[0]].selected = !!day[1].selected
            } else {
              otherAttendees.push(attendee)
            }
          })
          setValue(others, `${year[0]}.${month[0]}.${day[0]}`, { attendees: otherAttendees })
          if (!isOwner) others[year[0]][month[0]][day[0]].selected = !!day[1].selected
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

  Object.entries(updatedUserAvailability).forEach(year => {
    Object.entries(year[1]).forEach(month => {
      Object.entries(month[1]).forEach(day => {
        const userAvailabilityThisDay = day[1].attendees[0]
        userAvailabilityThisDay.userId = userId
        const dayRecordExists = eventDates
          && eventDates[year[0]]
          && eventDates[year[0]][month[0]]
          && eventDates[year[0]][month[0]][day[0]]
          && eventDates[year[0]][month[0]][day[0]].attendees
        dayRecordExists
          ? eventDates[year[0]][month[0]][day[0]].attendees.push(userAvailabilityThisDay)
          : setValue(eventDates, `${year[0]}.${month[0]}.${day[0]}.attendees`, [userAvailabilityThisDay])
          if (isEventOwner && day[1].selected) {
            eventDates[year[0]][month[0]][day[0]].selected = true
          }
      })
    })
  })

  Object.entries(eventDates).forEach(year => {
    Object.entries(year[1]).forEach(month => {
      Object.entries(month[1]).forEach(day => {
        if (day[1].attendees.length === 0) delete eventDates[year[0]][month[0]][day[0]].attendees
      })
    })
  })

  return eventDates
}