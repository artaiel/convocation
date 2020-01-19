const { validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongodb = require('mongodb')
const { getDB } = require('../db/db')

class User {
  constructor(username, email, password, eventsOwned) {
    this.username = username
    this.email = email
    this.password = password
    this.eventsOwned = eventsOwned
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
}

module.exports = User