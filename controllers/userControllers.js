const Event = require('../models/event')
const User = require('../models/user')

exports.getUserData = async (req, res, next) => {
  if (!req.userId) {
    const error = new Error('user not logged in')
    error.status = 403
    next(error)
  } else {
    const userData = await User.fetchUserById(req.userId)
    // console.log(userData)
    const eventsOwned = await Event.fetchMultipleEventsById(userData.eventsOwned)
    const eventsAttending = await Event.fetchMultipleEventsById(userData.eventsAttending)
    res.json({
      msg: 'event info',
      userData: {
        username: userData.username,
        email: userData.email
      },
      eventsOwned: eventsOwned.map(event => {
        const { _id, eventName, description, emailNotifications, webhookUrl, notificationLanguage, ...otherProperties } = event
        const attendeeNames = otherProperties.attendees.map(att => att.name)
        return { _id, eventName, description, attendeeNames, emailNotifications, webhookUrl, notificationLanguage }
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
    // console.log('------------------ start deleting user ----------------------')

    // list user events attended
    // list user events owned
    // remove events owned
    // remove mentions in events attending?
    // remove user
    try {
      const user = await User.fetchUserById(req.userId)
      const eventsOwned = user.eventsOwned.length > 0 ? [...user.eventsOwned] : null
      // const eventsAttending = user.eventsAttending.length > 0 ? [...user.eventsAttending] : null

      // remove owned event data
      if (eventsOwned) {
        const removeOwnedEvents = eventsOwned.map(async event => {
          return await Event.removeEvent(event)
        })
        await Promise.all(removeOwnedEvents)
      }

      // remove event from list of attended events for other users
      if (eventsOwned) {
        const removeMentionsOfEvents = eventsOwned.map(async event => {
          return await User.removeEventInMentions(event)
        })
        await Promise.all(removeMentionsOfEvents)
      }

      // remove user attendance in other events?

      // delete user itself
      await User.deleteUser(req.userId)

      res
        .status(200)
        .clearCookie('tau')
        .clearCookie('ccua')
        .json({ msg: 'log out' })
    } catch (err) {
      next(err)
    }
  }
}