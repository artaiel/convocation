const fs = require('fs')
const path = require('path')
const Event = require('../models/event')
const User = require('../models/user')

// exports.getEvent = (req, res, next) => {
//   const eventId = req.params.eventId
//   console.log(eventId)
//   fs.readFile(path.join(__dirname, '/..', 'placeholderData.json'), (err, data) => {
//     if (err) console.log(err)
//     const parsedData = JSON.parse(data)
//     if (parsedData[eventId]) {
//       res.status(200).json(parsedData[eventId])
//     } else {
//       res.status(404).json({
//         msg: 'event not found'
//       })
//     }
//   })
// }

exports.getEvent = (req, res, next) => {
  const eventId = req.params.eventId
  Event.fetchById(eventId)
    .then(event => {
      if (event) {
        res.status(200).json(event)
      } else {
        res.status(404).json({
          msg: 'cannot find event'
        })
      }
    })
    .catch(err => {
      console.log(err)
    })
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
    console.log(newEventData.insertedId)
    console.log(updatedUser)
    res.status(200).json({
      eventId: newEventData.insertedId
    })
  } catch (error) {
    err.status = 500
    next(error)
  }
}

exports.deleteEvent = (req, res, next) => {
  const eventId = req.body.eventId
  //
}
