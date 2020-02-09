const Event = require('../models/event')
const User = require('../models/user')

exports.getUserData = async (req, res, next) => {
  if (!req.userId) {
    const error = new Error('user not logged in')
    error.status = 403
    next(error)
  } else {
    const userData = await User.fetchUserById(req.userId)
    console.log(userData)
    const eventsOwned = await Event.fetchMultipleEventsById(userData.eventsOwned)
    const eventsAttending = await Event.fetchMultipleEventsById(userData.eventsAttending)
    res.json({
      msg: 'event info',
      userData: {
        username: userData.username,
        email: userData.email
      },
      eventsOwned: eventsOwned.map(event => {
        const { _id, eventName, description, emailNotifications, webhookUrl, ...otherProperties } = event
        const attendeeNames = otherProperties.attendees.map(att => att.name)
        return { _id, eventName, description, attendeeNames, emailNotifications, webhookUrl }
      }),
      eventsAttending: eventsAttending.map(event => {
        return {
          _id: event._id,
          eventName: event.eventName,
          description: event.description
        }
      })
    })
  }
}

exports.updateUserData = async (req, res, next) => {
  if (!req.userId) {
    const error = new Error('user not logged in')
    error.status = 403
    next(error)
  } else {
    try {
      await User.updateUserData(req.userId, req.body)
      res.status(200).json({
        msg: 'updated userdata'
      })
    } catch (err) {
      next(err)
    }
  }
}

exports.deleteUser = async (req, res, next) => {
  if (!req.userId) {
    const error = new Error('user not logged in')
    error.status = 403
    next(error)
  } else {

    // list user events attended
    // list user events owned
    // remove events owned
    // remove mentions in events attending?
    // remove user
    const user = await User.fetchUserById(req.userId)
    console.log(user)
    console.log('gotta delete users events first')
    res.status(201).json(user)
  }
}