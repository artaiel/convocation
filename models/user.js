const { validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongodb = require('mongodb')
const { getDB } = require('../db/db')
const ObjectId = mongodb.ObjectId

class User {
  constructor(username, email, password) {
    this.username = username
    this.email = email
    this.password = password
    this.eventsOwned = []
    this.eventsAttending = []
  }

  createUser () {
    const db = getDB()
    return db.collection('users').insertOne(this)
  }

  static checkIfUsernameOrEmailTaken (username, email) {
    const db = getDB()
    return db.collection('users').find({ $or: [
      { username: username },
      { email: email }
    ]}).toArray()
  }

  static findUser (usernameOrEmail) {
    const db = getDB()
    return db.collection('users').findOne({ $or: [
        { username: usernameOrEmail },
        { email: usernameOrEmail }
      ]
    })
  }

  static fetchUserById (userId) {
    const db = getDB()
    return db.collection('users').findOne({ _id: ObjectId(userId) })
  }

  static addUserEventsOwned (userId, eventId) {
    const db = getDB()
    return db
      .collection('users')
      .updateOne(
        { _id: ObjectId(userId) },
        { $push: { "eventsOwned": eventId }}
      )
  }

  static addUserEventsAttending (userId, eventId) {
    const db = getDB()
    return db
      .collection('users')
      .updateOne(
        { _id: ObjectId(userId) },
        { $push: { "eventsAttending": eventId }}
      )
  }

  static removeEventInMentions (eventId) {
    const db = getDB()
    return db.collection('users')
      .update(
        {},
        {
          $pull: {
            eventsOwned: ObjectId(eventId),
            eventsAttending: ObjectId(eventId)
          }
        },
        { multi: true }
      )
      .catch(err => {
        throw err
      })
  }
}

module.exports = User