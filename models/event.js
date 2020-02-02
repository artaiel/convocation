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
    this.webhookUrl = null
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
    console.log('argumentInStaticUpdateEventAttendance', eventData.dates['2020']['0'])
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

  static updateEventData (eventData) {
    // console.log('argumentInStaticUpdateEventAttendance', eventData.dates['2020']['0'])
    // const db = getDB()
    // return db.collection('events')
    //   .findOneAndUpdate(
    //     { _id: ObjectId(eventData._id) },
    //     {
    //       $set: {
    //         dates: eventData.dates,
    //         attendees: eventData.attendees
    //       }
    //     },
    //     {
    //       returnOriginal: false,
    //       returnNewDocument: true
    //     }
    //   )
    //   .catch(err => {
    //     throw err
    //   })
    // const db = getDB()
    // return db.collection('events')
    //   .find({ _id: ObjectId(eventId) })
    //   .next()
    console.log(eventData)
  }
}

module.exports = Event