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

  static deleteUser (userId) {
    const db = getDB()
    return db.collection('users').deleteOne({ _id: ObjectId(userId) })
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

  static removeUserEventsAttending (userId, eventId) {
    const db = getDB()
    return db
      .collection('users')
      .updateOne(
        { _id: ObjectId(userId) },
        { $pull: { "eventsAttending": eventId }}
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

  static async updateUserData (userId, formData) {
    const db = getDB()
    const update = {
      username: formData.username,
      email: formData.email
    }
    if (formData.password) {
      try {
        const hashedPassword = await bcryptjs.hash(formData.password, 12)
        update.password = hashedPassword
      } catch (err) {
        next(err)
      }
    }

    return db.collection('users')
      .findOneAndUpdate(
        { _id: ObjectId(userId) },
        {
          $set: update
        }
      )
      .catch(err => {
        throw err
      })
  }
}

module.exports = User