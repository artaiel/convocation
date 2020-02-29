const nodemailer = require('nodemailer')
const { emailEventUpdateText } = require('./translations')

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
    user: 'anders.walczak@gmail.com',
    pass: 'xsmtpsib-a4650f3c1824940a24907654bcc4b62e3c44eac352cf414e3325ee33cbc06519-BsxA3ETXcKfFYP9r',
  },
  tls: {
    rejectUnauthorized: false
  }
})