const fs = require('fs')
const path = require('path')
const axios = require('axios')

const Event = require('../models/event')
const User = require('../models/user')
const { extractUserDates, mergeUserDates, countDaysAvailable } = require('../utils/helpers')

exports.getEventData = async (req, res, next) => {
  const eventId = req.params.eventId
  console.log('fetching event data for user ', req.userId)

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
      // console.log('eventId in get', eventId)
      const eventData = await Event.fetchById(eventId)
      // console.log('eventData in get', eventData)
      if (!eventData) {
        const error = new Error('no such event')
        error.statusCode = 404
        next(error)
        return
      }
      userNotEnrolled = !eventData.attendees.map(att => att.userId.toString()).includes(req.userId.toString())
      const userData = await User.fetchUserById(req.userId)
      console.log('get username from here I guess', userData)
      if (userNotEnrolled) {
        console.log('user not enrolled; fetching everything')
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
    err.status = 500
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
      console.log('eventData !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      console.log(eventData)
      console.log(updatedUsername)
      let updatedEventData = await Event.updateEventAttendance(eventData)
      updatedEventData = updatedEventData.value

      // send webhook
      if (updatedEventData.webhookUrl) {
        console.log('updatedUserAvailability', updatedUserAvailability)
        console.log('user', user)
        const dataBefore = countDaysAvailable(user)
        const dataNow = countDaysAvailable(updatedUserAvailability)
        console.log(updatedUsername + ' has updated their attendance :dragon:. Had ' + dataBefore.count + ' days available, now has ' + dataNow.count + '.')
        let difference = ''
        if (dataNow.count > dataBefore.count) difference = ` with ${dataNow.count - dataBefore.count} more potential dates than before.`
        if (dataNow.count < dataBefore.count) difference = ` with ${dataBefore.count - dataNow.count} fewer potential dates than before.`
        const message = `${updatedUsername} has updated their attendance ${difference}`
        console.log(dataBefore.selectedDates)
        console.log(dataNow.selectedDates)
        // axios({
        //   method: 'POST',
        //   url: updatedEventData.webhookUrl,
        //   headers: { 'content-type': 'application/json' },
        //   data: {
        //     content: message
        //   }
        // })
      }

      // extract current user just like in normally getting event data
      const { user: updatedUserDates, others: updatedOthersDates } = extractUserDates(updatedEventData, userId)
      const coreEventData = { ...updatedEventData }
      coreEventData.dates = { ...updatedOthersDates }
      const userData = await User.fetchUserById(req.userId)
      // console.log('updating user')
      // console.log(userData)
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
  const description = req.body.description

  if (!req.userId) {
    res.status(403).json({ msg: 'you must be logged in' })
  } else {
    try {
      const eventData = await Event.fetchById(eventId)
      console.log('eventData from db')
      console.log(eventData)
      const update = {}
      if (eventName !== eventData.eventName) update.eventName = eventName
      if (description !== eventData.description) update.description = description
      if (emailNotifications !== eventData.emailNotifications) update.emailNotifications = emailNotifications
      if (webhookUrl !== eventData.webhookUrl) update.webhookUrl = webhookUrl
      const hasNewData = Object.keys(update).length > 0
      // return if there is no nothing to update
      if (!hasNewData) {
        res.status(400).json({
          msg: 'no change detected'
        })
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
  console.log(req.params.eventId)
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