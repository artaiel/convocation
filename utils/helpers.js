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

const formatDate = (dateString) => {
  const date = dateString.split('-')
  date[1] = +date[1] + 1
  return date.join('.')
}

exports.createWebhookEventSelectedMessage = (dataBefore, dataNow) => {
  const newSelectedDates = dataNow.selectedDates.map(selected => dataBefore.selectedDates.includes(selected) ? null : selected).filter(date => !!date)
  const removedSelectedDates = dataBefore.selectedDates.map(selected => dataNow.selectedDates.includes(selected) ? null : selected).filter(date => !!date)
  const newDatesCount = newSelectedDates.length
  const removedDatesCount = removedSelectedDates.length
  let dateAnnouncement
  if (newDatesCount && removedDatesCount) {
    dateAnnouncement = `:mage: Prepare @here! `
    if (newDatesCount === 1) {
      dateAnnouncement += `A new date has been set for a meeting on ${formatDate(newSelectedDates[0])}, and `
    } else {
      dateAnnouncement += `New dates have been set for meetings on ${newSelectedDates.map(date => formatDate(date)).join(', ')}, and `
    }
    if (removedDatesCount === 1) {
      dateAnnouncement += `session has been canceled on ${formatDate(removedSelectedDates[0])}`
    } else {
      dateAnnouncement += `sessions have been canceled on ${removedSelectedDates.map(date => formatDate(date)).join(', ')}`
    }

  } else if (newDatesCount) {
    if (newDatesCount === 1) {
      dateAnnouncement = `:mage: Prepare @here! A new date has been set for a meeting on ${formatDate(newSelectedDates[0])}`
    } else {
      dateAnnouncement = `:mage: Prepare @here! New dates have been set for meetings on ${newSelectedDates.map(date => formatDate(date)).join(', ')}`
    }
  } else if (removedDatesCount) {
    if (removedDatesCount === 1) {
      dateAnnouncement = `:skull: Watch out @here! Session has been cancelled on ${formatDate(removedSelectedDates[0])}`
    } else {
      dateAnnouncement = `:skull: Watch out @here! Sessions have been cancelled on ${removedSelectedDates.map(date => formatDate(date)).join(', ')}`
    }
  }

  return dateAnnouncement
}

exports.createWebhookEventUpdateMessage = (dataBefore, dataNow, updatedUsername) => {
  let difference = ''
  if (dataNow.count > dataBefore.count) {
    const count = dataNow.count - dataBefore.count
    difference = `with ${count} more potential date${count === 1 ? '' : 's'} than before.`
  }
  if (dataNow.count < dataBefore.count) {
    const count = dataBefore.count - dataNow.count
    difference = `with ${count} fewer potential date${count === 1 ? '' : 's'} than before.`
  }
  return `:dragon: ${updatedUsername} has updated their attendance ${difference}`
}