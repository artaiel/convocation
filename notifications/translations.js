const { formatDate } = require('../utils/helpers')

exports.emailEventUpdateText = (type, lang, eventUrl, username, count) => {
  // return `type: ${type}, lang: ${lang}, eventUrl: ${eventUrl}, count: ${count}`
  if (lang === 'en') {
    let difference = ''
    if (type === 'more') {
      difference = ` with ${count} more potential date${count === 1 ? '' : 's'} than before`
    } else if (type === 'fewer') {
      difference = ` with ${count} fewer potential date${count === 1 ? '' : 's'} than before`
    }
    return `Hello there,<br><br>attendee <strong>${username}</strong> has updated their attendance${difference} in your <a href="${eventUrl}">event.</a>`
  } else if (lang === 'de') {
    return 'update in deutsch pending'
  } else if (lang === 'pl') {
    let difference = ''
    if (type === 'more') {
      difference = `zaznaczając ${count} ${count === 1 ? 'dzień' : 'dni'} więcej niż poprzednio.`
    } else if (type === 'fewer') {
      difference = `zaznaczając ${count} ${count === 1 ? 'dzień' : 'dni'} mniej niż poprzednio.`
    }
    return `Cześć,<br><br>uczestnik <strong>${username}</strong> zaktualizował swoją potencjalną obecność w Twoim <a href="${eventUrl}">wydarzeniu</a> ${difference}`
  }
}

exports.createWebhookEventSelectedMessage = (dataBefore, dataNow, language) => {
  const newSelectedDates = dataNow.selectedDates.map(selected => dataBefore.selectedDates.includes(selected) ? null : selected).filter(date => !!date)
  const removedSelectedDates = dataBefore.selectedDates.map(selected => dataNow.selectedDates.includes(selected) ? null : selected).filter(date => !!date)
  const newDatesCount = newSelectedDates.length
  const removedDatesCount = removedSelectedDates.length
  let dateAnnouncement
  console.log('newDatesCount', newDatesCount)
  console.log('removedDatesCount', removedDatesCount)

  if (language === 'en' || language === 'de') {
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
  } else if (language === 'pl') {
    if (newDatesCount && removedDatesCount) {
      dateAnnouncement = `:mage: Uwaga @here! `
      if (newDatesCount === 1) {
        dateAnnouncement += `${formatDate(newSelectedDates[0])} został wybrany jako nowa data, a `
      } else {
        dateAnnouncement += `${newSelectedDates.map(date => formatDate(date)).join(', ')} zostały wybrane jako nowe daty, a `
      }
      if (removedDatesCount === 1) {
        dateAnnouncement += `spotkanie ${formatDate(removedSelectedDates[0])} zostało odwołane`
      } else {
        dateAnnouncement += `spotkania ${removedSelectedDates.map(date => formatDate(date)).join(', ')} zostały odwołane`
      }
    } else if (newDatesCount) {
      if (newDatesCount === 1) {
        dateAnnouncement = `:mage: Uwaga @here! ${formatDate(newSelectedDates[0])} został wybrany jako dzień spotkania`
      } else {
        dateAnnouncement = `:mage: Uwaga @here! ${newSelectedDates.map(date => formatDate(date)).join(', ')} zostały wybrane jako dni spotkań`
      }
    } else if (removedDatesCount) {
      if (removedDatesCount === 1) {
        dateAnnouncement = `:skull: Uwaga @here! Spotkanie ${formatDate(removedSelectedDates[0])} zostało odwołane`
      } else {
        dateAnnouncement = `:skull: Uwaga @here! Spotkania ${removedSelectedDates.map(date => formatDate(date)).join(', ')} zostały odwołane`
      }
    }
  }

  return dateAnnouncement
}

exports.createWebhookEventUpdateMessage = (dataBefore, dataNow, updatedUsername, language) => {
  let difference = ''
  const moreDates = dataNow.count > dataBefore.count
  const fewerDates = dataNow.count < dataBefore.count
  let count
  if (moreDates) {
    count = dataNow.count - dataBefore.count
  } else if (fewerDates) {
    count = dataBefore.count - dataNow.count
  }

  if (language === 'en' || language === 'de') {
    if (moreDates) {
      difference = `with ${count} more potential date${count === 1 ? '' : 's'} than before`
    }
    if (fewerDates) {
      difference = `with ${count} fewer potential date${count === 1 ? '' : 's'} than before`
    }

    return `:dragon: ${updatedUsername} has updated their attendance ${difference}`
  // } else if (language === 'de') {
    // let difference = ''
    // if (moreDates) {
    //   difference = `zaznaczając ${count} ${count === 1 ? 'dzień' : 'dni'} więcej niż poprzednio`
    // }
    // if (fewerDates) {
    //   difference = `zaznaczając ${count} ${count === 1 ? 'dzień' : 'dni'} mniej niż poprzednio`
    // }

    // return `:flag-de:`
  } else if (language === 'pl') {
    let difference = ''
    if (moreDates) {
      difference = `zaznaczył/a ${count} ${count === 1 ? 'dzień' : 'dni'} więcej niż poprzednio`
    }
    if (fewerDates) {
      difference = `zaznaczył/a ${count} ${count === 1 ? 'dzień' : 'dni'} mniej niż poprzednio`
    }

    return `:dragon: ${updatedUsername} ${difference || 'zaktualizował/a swoje uczestnictwo'}`
  }
}