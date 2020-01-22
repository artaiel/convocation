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

  static addUserEventsOwned (userId, eventId) {
    const db = getDB()
    return db
      .collection('users')
      .updateOne(
        { _id: ObjectId(userId) },
        { $push: { "eventsOwned": eventId }}
      )
  }
}

module.exports = User