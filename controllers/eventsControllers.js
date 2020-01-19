const fs = require('fs')
const path = require('path')
const Event = require('../models/event')

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


exports.createEvent = (req, res, next) => {
  console.log(req.body)
  const name = req.body.name
  const description = req.body.description
  const ownerId = req.body.ownerId
  const dates = req.body.dates
  const attendees = req.body.attendees
  const event = new Event(name, description, ownerId, dates, attendees)
  event
    .save()
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
}

exports.deleteEvent = (req, res, next) => {
  const eventId = req.body.eventId
  //
}
