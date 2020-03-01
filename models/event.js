const { getDB } = require('../db/db')
const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId

class Event {
  constructor (eventName, description, ownerId, ownerName, dates, attendees) {
    this.eventName = eventName
    this.description = description
    this.ownerId = ownerId
    this.ownerName = ownerName
    this.dates = dates
    this.attendees = attendees
    this.emailNotifications = false
    this.webhookUrl = '',
    this.notificationLanguage = 'en'
  }

  save () {
    const db = getDB()
    let dbUpdated = db.collection('events').insertOne(this)
    return dbUpdated
      .then(result => {
        return result
      })
      .catch(err => {
        console.log(err)
      })
  }

  static fetchById (eventId) {
    const db = getDB()
    return db.collection('events')
      .find({ _id: ObjectId(eventId) })
      .next()
      .then(event => {
        return event
      })
      .catch(err => {
        console.log(err)
      })
  }

  static fetchMultipleEventsById (eventIds) {
    const db = getDB()
    return db.collection('events')
      .find({ _id: { $in: eventIds } })
      .toArray()
      .then(event => {
        return event
      })
      .catch(err => {
        return err
      })
  }

  static updateEventAttendance (eventData) {
    const db = getDB()
    return db.collection('events')
      .findOneAndUpdate(
        { _id: ObjectId(eventData._id) },
        {
          $set: {
            dates: eventData.dates,
            attendees: eventData.attendees
          }
        },
        {
          returnOriginal: false,
          returnNewDocument: true
        }
      )
      .catch(err => {
        throw err
      })
  }

  static updateEventData (eventId, update) {
    const db = getDB()
    return db.collection('events')
      .findOneAndUpdate(
        { _id: ObjectId(eventId) },
        {
          $set: update
        },
        {
          returnOriginal: false,
          returnNewDocument: true
        }
      )
      .catch(err => {
        throw err
      })
  }

  static removeEvent (eventId) {
    const db = getDB()
    return db.collection('events')
      .deleteOne({ _id: ObjectId(eventId) })
      .catch(err => {
        throw err
      })
  }
}

module.exports = Event