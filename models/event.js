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
    this.emailNotifications = true
    this.webhookUrl = ''
  }

  save () {
    const db = getDB()
    let dbUpdated = db.collection('events').insertOne(this)
    return dbUpdated
      .then(result => {
        // console.log(result)
        return result
      })
      .catch(err => {
        console.log(err)
      })
  }

  static fetchById (eventId) {
    console.log('trying to fetch in model')
    const db = getDB()
    return db.collection('events')
      .find({ _id: ObjectId(eventId) })
      .next()
      .then(event => {
        return event
      })
      .catch(err => {
        console.log('error at static fetchById')
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
        console.log('error fetching multiple events')
        return err
      })
  }

  static updateEventAttendance (eventData) {
    console.log('eventData to update in db')
    console.log(eventData)
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