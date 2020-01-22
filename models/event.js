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
      .find({_id: ObjectId(eventId)})
      .next()
      .then(event => {
        return event
      })
      .catch(err => {
        console.log('error at static fetchById')
        console.log(err)
      })
    // try {
    //   db.collection('events')
    // }
  }
}

module.exports = Event