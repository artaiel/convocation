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
        const { _id, eventName, description, ...otherProperties } = event
        return { _id, eventName, description }
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