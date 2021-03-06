const axios = require('axios')

const Event = require('../models/event')
const User = require('../models/user')
const {
  extractUserDates,
  mergeUserDates,
  countDaysAvailable,
} = require('../utils/helpers')
const { createEventUpdateEmail, transporter } = require('../notifications/email')
const { createWebhookEventSelectedMessage, createWebhookEventUpdateMessage } = require('../notifications/webhooks')


exports.getEventData = async (req, res, next) => {
  const eventId = req.params.eventId

  if (!req.userId) {
    try {
      const eventData = await Event.fetchById(eventId)
      if (!eventData) {
        const error = new Error('no such event')
        error.statusCode = 404
        next(error)
        return
      }
      res.status(200).json(eventData)
    } catch (err) {
      next(err)
    }
  } else {
    try {
      const eventData = await Event.fetchById(eventId)
      if (!eventData) {
        const error = new Error('no such event')
        error.statusCode = 404
        next(error)
        return
      }
      userNotEnrolled = !eventData.attendees.map(att => att.userId.toString()).includes(req.userId.toString())
      const userData = await User.fetchUserById(req.userId)
      if (userNotEnrolled) {
        res.status(200).json(
          {
            userDates: {},
            userName: userData.username,
            userId: req.userId,
            ...eventData }
        )
      } else {
        const { user, others } = extractUserDates(eventData, req.userId)
        const coreEventData = { ...eventData }
        coreEventData.dates = { ...others }
        res.status(200).json(
          {
            userDates: user,
            userName: userData.username,
            userId: req.userId,
            ...coreEventData
          }
        )
      }
    } catch (err) {
      next(err)
    }
  }
}

exports.createEvent = async (req, res, next) => {
  try {
    const ownerName = req.body.eventOwner
    const description = req.body.eventDescription
    const eventName = req.body.eventName
    const ownerId = req.userId ? req.userId : null
    const event = new Event(eventName, description, ownerId, ownerName, {}, [])
    const newEventData = await event.save()
    await User.addUserEventsOwned(ownerId, newEventData.insertedId)
    res.status(200).json({
      eventId: newEventData.insertedId
    })
  } catch (error) {
    error.status = 500
    next(error)
  }
}

exports.updateEventAttendance = async (req, res, next) => {
  const eventId = req.body.eventId
  const userId = req.userId
  const updatedUsername = req.body.usernameInEvent
  const updatedUserAvailability = req.body.userAvailability

  if (!req.userId) {
    res.status(403).json({ msg: 'you must be logged in' })
  } else {
    try {
      const eventData = await Event.fetchById(eventId)
      const { user, others } = extractUserDates(eventData, userId)
      const isOwner = eventData.ownerId.toString() === userId.toString()
      const updatedEventDates = mergeUserDates(others, updatedUserAvailability, userId, isOwner) // add updated user to other's selections, and add userId from cookie into placeholder from FE
      eventData.dates = updatedEventDates
      const userAlreadyOnTheList = eventData.attendees.map(att => att.userId.toString()).includes(userId.toString())
      const userHasRecordsInEvent = Object.keys(updatedUserAvailability).length > 0
      if (userAlreadyOnTheList && updatedUsername) {
        eventData.attendees.find(user => user.userId.toString() === userId.toString()).name = updatedUsername
      }
      if (userAlreadyOnTheList && !userHasRecordsInEvent) {
        eventData.attendees = eventData.attendees.filter(attendee => attendee.userId.toString() !== userId.toString())
        await User.removeUserEventsAttending(userId, eventData._id)
      } else if (!userAlreadyOnTheList && userHasRecordsInEvent) {
        eventData.attendees.push({
          userId,
          name: updatedUsername
        })
        await User.addUserEventsAttending(userId, eventData._id)
      }

      // update event data
      let updatedEventData = await Event.updateEventAttendance(eventData)
      updatedEventData = updatedEventData.value


      let dataBefore, dataNow
      if (updatedEventData.emailNotifications || updatedEventData.webhookUrl) {
        dataBefore = countDaysAvailable(user)
        dataNow = countDaysAvailable(updatedUserAvailability)
      }

      // send email to owner
      if (updatedEventData.emailNotifications && !isOwner) {
        const ownerData = await User.fetchUserById(updatedEventData.ownerId)
        const message = createEventUpdateEmail({
          email: ownerData.email,
          username: updatedUsername,
          dataBefore,
          dataNow,
          eventId: updatedEventData._id,
          language: updatedEventData.notificationLanguage
        })
        transporter.sendMail(message)
      }

      // send webhook
      if (updatedEventData.webhookUrl) {
        const isSlackWebhook = !!updatedEventData.webhookUrl.match(/slack\.com/)
        const objectKeyName = isSlackWebhook ? 'text' : 'content'

        const dateAnnouncement = createWebhookEventSelectedMessage(dataBefore, dataNow, updatedEventData.notificationLanguage, isSlackWebhook)
        if (dateAnnouncement) {
          try {
            axios({
              method: 'POST',
              url: updatedEventData.webhookUrl,
              headers: { 'content-type': 'application/json' },
              data: {
                [objectKeyName]: dateAnnouncement
              }
            })
          } catch (err) {
            next(err)
          }
        } else {
          const message = createWebhookEventUpdateMessage(dataBefore, dataNow, updatedUsername, updatedEventData.notificationLanguage)
          axios({
            method: 'POST',
            url: updatedEventData.webhookUrl,
            headers: { 'content-type': 'application/json' },
            data: {
              [objectKeyName]: message
            }
          })
        }
      }

      // extract current user just like in normally getting event data
      const { user: updatedUserDates, others: updatedOthersDates } = extractUserDates(updatedEventData, userId)
      const coreEventData = { ...updatedEventData }
      coreEventData.dates = { ...updatedOthersDates }
      const userData = await User.fetchUserById(req.userId)
      res.status(201).json({
        userDates: updatedUserDates,
        userName: userData.username,
        userId: userId,
        ...coreEventData
      })
    } catch (err) {
      next(err)
    }
  }
}

exports.updateEventData = async (req, res, next) => {
  const eventId = req.body.eventId
  const eventName = req.body.eventName
  const webhookUrl = req.body.webhookUrl
  const emailNotifications = req.body.emailNotifications
  const notificationLanguage = req.body.notificationLanguage
  const description = req.body.description

  if (!req.userId) {
    res.status(403).json({ error: 'you must be logged in' })
  } else {
    try {
      const eventData = await Event.fetchById(eventId)
      const update = {}
      if (eventName !== eventData.eventName) update.eventName = eventName
      if (description !== eventData.description) update.description = description
      if (emailNotifications !== eventData.emailNotifications) update.emailNotifications = emailNotifications
      if (webhookUrl !== eventData.webhookUrl) update.webhookUrl = webhookUrl
      if (notificationLanguage !== eventData.notificationLanguage) update.notificationLanguage = notificationLanguage
      const hasNewData = Object.keys(update).length > 0
      // return if there is no nothing to update
      if (!hasNewData) {
        const error = new Error('errorNoEventUpdate')
        error.statusCode = 404
        next(error)
        return
      }

      const updatedEvent = await Event.updateEventData(eventId, update)
      res.status(200).json(updatedEvent.value)
    } catch (err) {
      next(err)
    }
  }
}

exports.deleteEvent = async (req, res, next) => {
  try {
    await Promise.all([
      Event.removeEvent(req.params.eventId),
      User.removeEventInMentions(req.params.eventId)
    ])
    res.status(200).json({
      msg: 'removed event'
    })
  } catch (err) {
    next(err)
  }
}