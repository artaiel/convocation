const { formatDate } = require('../utils/helpers')

exports.createWebhookEventSelectedMessage = (dataBefore, dataNow, language, isSlackWebhook) => {
  const newSelectedDates = dataNow.selectedDates.map(selected => dataBefore.selectedDates.includes(selected) ? null : selected).filter(date => !!date)
  const removedSelectedDates = dataBefore.selectedDates.map(selected => dataNow.selectedDates.includes(selected) ? null : selected).filter(date => !!date)
  const newDatesCount = newSelectedDates.length
  const removedDatesCount = removedSelectedDates.length
  let dateAnnouncement

  if (language === 'en') {
    if (newDatesCount && removedDatesCount) {
      dateAnnouncement = `:mage: Prepare ${isSlackWebhook ? '<!here>!' : '@here!'} `
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
        dateAnnouncement = `:mage: Prepare ${isSlackWebhook ? '<!here>!' : '@here!'} A new date has been set for a meeting on ${formatDate(newSelectedDates[0])}`
      } else {
        dateAnnouncement = `:mage: Prepare ${isSlackWebhook ? '<!here>!' : '@here!'} New dates have been set for meetings on ${newSelectedDates.map(date => formatDate(date)).join(', ')}`
      }
    } else if (removedDatesCount) {
      if (removedDatesCount === 1) {
        dateAnnouncement = `:skull: Watch out ${isSlackWebhook ? '<!here>!' : '@here!'} Session has been cancelled on ${formatDate(removedSelectedDates[0])}`
      } else {
        dateAnnouncement = `:skull: Watch out ${isSlackWebhook ? '<!here>!' : '@here!'} Sessions have been cancelled on ${removedSelectedDates.map(date => formatDate(date)).join(', ')}`
      }
    }
  } else if (language === 'de') {
    if (newDatesCount && removedDatesCount) {
      dateAnnouncement = `:mage: Wichtig ${isSlackWebhook ? '<!here>!' : '@here!'} `
      if (newDatesCount === 1) {
        dateAnnouncement += `Es wurde ein neuer Termin festgelegt für ein Treffen am ${formatDate(newSelectedDates[0])} und `
      } else {
        dateAnnouncement += `Neue Termine wurden festgelegt für ein Treffen am ${newSelectedDates.map(date => formatDate(date)).join(', ')} und `
      }
      if (removedDatesCount === 1) {
        dateAnnouncement += `${formatDate(removedSelectedDates[0])} wurde am abgesagt`
      } else {
        dateAnnouncement += `${removedSelectedDates.map(date => formatDate(date)).join(', ')} wurde am abgesagt`
      }
    } else if (newDatesCount) {
      if (newDatesCount === 1) {
        dateAnnouncement = `:mage: Wichtig ${isSlackWebhook ? '<!here>!' : '@here!'} Neue Termine wurden festgelegt für ein Treffen am ${formatDate(newSelectedDates[0])}`
      } else {
        dateAnnouncement = `:mage: Wichtig ${isSlackWebhook ? '<!here>!' : '@here!'} Neue Termine wurden festgelegt für ein Treffen am ${newSelectedDates.map(date => formatDate(date)).join(', ')}`
      }
    } else if (removedDatesCount) {
      if (removedDatesCount === 1) {
        dateAnnouncement = `:skull: Wichtig ${isSlackWebhook ? '<!here>!' : '@here!'} Das Treffen am ${formatDate(removedSelectedDates[0])} wurde abgesagt`
      } else {
        dateAnnouncement = `:skull: Wichtig ${isSlackWebhook ? '<!here>!' : '@here!'} Das Treffen am ${removedSelectedDates.map(date => formatDate(date)).join(', ')} wurde abgesagt`
      }
    }
  } else if (language === 'pl') {
    if (newDatesCount && removedDatesCount) {
      dateAnnouncement = `:mage: Uwaga ${isSlackWebhook ? '<!here>!' : '@here!'} `
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
        dateAnnouncement = `:mage: Uwaga ${isSlackWebhook ? '<!here>!' : '@here!'} ${formatDate(newSelectedDates[0])} został wybrany jako dzień spotkania`
      } else {
        dateAnnouncement = `:mage: Uwaga ${isSlackWebhook ? '<!here>!' : '@here!'} ${newSelectedDates.map(date => formatDate(date)).join(', ')} zostały wybrane jako dni spotkań`
      }
    } else if (removedDatesCount) {
      if (removedDatesCount === 1) {
        dateAnnouncement = `:skull: Uwaga ${isSlackWebhook ? '<!here>!' : '@here!'} Spotkanie ${formatDate(removedSelectedDates[0])} zostało odwołane`
      } else {
        dateAnnouncement = `:skull: Uwaga ${isSlackWebhook ? '<!here>!' : '@here!'} Spotkania ${removedSelectedDates.map(date => formatDate(date)).join(', ')} zostały odwołane`
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

  if (language === 'en') {
    if (moreDates) {
      difference = `with ${count} more potential date${count === 1 ? '' : 's'} than before`
    }
    if (fewerDates) {
      difference = `with ${count} fewer potential date${count === 1 ? '' : 's'} than before`
    }

    return `:dragon: ${updatedUsername} has updated their attendance ${difference}`
  } else if (language === 'de') {
    let difference = ''
    if (moreDates) {
      difference = `hat gerade seiner Teilnahme an deiner Veranstaltung ${count} weitere/n mögliche Termin/e  hinzugefügt.`
    }
    if (fewerDates) {
      difference = `hat gerade ${count} mögliche/n Termin/e deiner Veranstaltung aus seinen priorisierten ausgeschlossen.`
    }

    return `:dragon: ${updatedUsername} ${difference || 'hat gerade seine Teilnahme geupdated'}`
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
