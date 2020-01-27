const fs = require('fs')
const path = require('path')
const Event = require('../models/event')
const User = require('../models/user')
const { extractUserDates, mergeUserDates } = require('../utils/helpers')

exports.getEventData = async (req, res, next) => {
  const eventId = req.params.eventId
  console.log('fetching event data for user ', req.userId)

  if (!req.userId) {
    try {
      const eventData = await Event.fetchById(eventId)
      res.status(200).json(eventData)
    } catch (err) {
      next(err)
    }
  } else {
    try {
      const eventData = await Event.fetchById(eventId)
      userNotEnrolled = !eventData.attendees.map(att => att.userId.toString()).includes(req.userId.toString())
      const userData = await User.fetchUserById(req.userId)
      console.log('get username from here I guess', userData)
      if (userNotEnrolled) {
        console.log('user not enrolled; fetching everything')
        res.status(200).json({ userDates: {}, userName: userData.username, ...eventData })
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
    const event = new Event(eventName, description, ownerId, ownerName)
    const newEventData = await event.save()
    const updatedUser = await User.addUserEventsOwned(ownerId, newEventData.insertedId)
    // console.log(newEventData.insertedId)
    // console.log(updatedUser)
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
      const { others } = extractUserDates(eventData, userId)
      const updatedEventDates = mergeUserDates(others, updatedUserAvailability, userId) // add updated user to other's selections, and add userId from cookie into placeholder from FE
      eventData.dates = updatedEventDates
      const userAlreadyOnTheList = eventData.attendees.map(att => att.userId.toString()).includes(userId.toString())
      const userHasRecordsInEvent = Object.keys(updatedUserAvailability).length > 0
      if (userAlreadyOnTheList && updatedUsername) {
        eventData.attendees.find(user => user.userId.toString() === userId.toString()).name = updatedUsername
      }
      if (userAlreadyOnTheList && !userHasRecordsInEvent) {
        eventData.attendees = eventData.attendees.filter(attendee => attendee.userId.toString() !== userId.toString())
      } else if (!userAlreadyOnTheList && userHasRecordsInEvent) {
        eventData.attendees.push({
          userId,
          name: updatedUsername
        })
      }

      // update event data
      let updatedEventData = await Event.updateEventAttendance(eventData)
      updatedEventData = updatedEventData.value

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

  // get eventData
  // pass to helper, along with updated user availability
  // after removing old user availibilty (existing helper) -> join other users with updated availibity in dates object (new helper)
  // set dates in eventData in that collection
  // ??? profit?
  // return updated event data again
  // if - entries, remove user from attendees list for that event
}

exports.deleteEvent = (req, res, next) => {
  const eventId = req.body.eventId
  //
}
