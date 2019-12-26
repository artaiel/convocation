const nodemailer = require('nodemailer')

const emailEventUpdateText = (type, lang, eventUrl, username, count) => {
  if (lang === 'en') {
    let difference = ''
    if (type === 'more') {
      difference = ` with ${count} more potential date${count === 1 ? '' : 's'} than before`
    } else if (type === 'fewer') {
      difference = ` with ${count} fewer potential date${count === 1 ? '' : 's'} than before`
    }
    return `Hello there,<br><br>attendee <strong>${username}</strong> has updated their attendance${difference} in your <a href="${eventUrl}">event.</a>`
  } else if (lang === 'de') {
    return `Hi!<br><br>Teilnehmer <strong>${username}</strong> hat gerade seiner Teilnahme an deiner <a href="${eventUrl}">Veranstaltung.</a>`
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

const updateEventText = (payload) => {
  const eventUrl = `https://circle-convocation.herokuapp.com/event/${payload.eventId}`
  const moreDates = payload.dataNow.count > payload.dataBefore.count
  const fewerDates = payload.dataNow.count < payload.dataBefore.count
  let type
  if (moreDates) {
    type = 'more'
  } else if (fewerDates) {
    type = 'fewer'
  } else {
    type = 'default'
  }
  let count
  if (moreDates) count = payload.dataNow.count - payload.dataBefore.count
  if (fewerDates) count = payload.dataBefore.count - payload.dataNow.count

  return emailEventUpdateText(type, payload.language, eventUrl, payload.username, count)
}

const newPasswordText = (password) => {
  return `Here is a new password you've requested.
    <br>
    <br>
    <strong>${password}</strong>
    <br>
    <br>
    Use it to log in to your account and change your password to a new one.`
}

exports.createNewPasswordEmail = (email, password) => {
  return {
    from: 'app.convocation@gmail.com',
    to: email,
    subject: `New password`,
    text: 'Convocation password request',
    html: newPasswordText(password),
  }
}

exports.createEventUpdateEmail = (payload) => {
  return {
    from: 'app.convocation@gmail.com',
    to: payload.email,
    subject: `Your event has been updated`,
    text: 'Convocation event update',
    html: updateEventText(payload),
  }
}

exports.transporter = nodemailer.createTransport({
  host: 'smtp-relay.sendinblue.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
})