const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cryptoRandomString = require('crypto-random-string')
const { createNewPasswordEmail, transporter } = require('../notifications/email')

exports.signup = async (req, res, next) => {
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password
  const passwordRepeated = req.body.passwordRepeated
  // 1. check if email or username already taken
  const uniqueCheck = await User.checkIfUsernameOrEmailTaken(username, email)
  const usernameTaken = uniqueCheck.some(user => user.username === username)
  const emailTaken = uniqueCheck.some(user => user.email === email)
  if (usernameTaken || emailTaken) {
    const message = usernameTaken ? 'username taken' : 'email taken'
    const error = new Error(message)
    error.statusCode = 409
    return next(error)
  }
  // 2. check if passwords are same with validator
  if (password === passwordRepeated) {
    try {
      const hashedPassword = await bcryptjs.hash(password, 12)
      const user = new User(
        username,
        email,
        hashedPassword
      )
      const data = await user.createUser()
      res.status(201).json({
        msg: 'user created with async await',
        userId: data.insertedId
      })
    } catch (err) {
      console.log(err)
      res.status(500).json({ err })
    }
  }
}

exports.login = async (req, res, next) => {
  const userIdentifier = req.body.userIdentifier
  const password = req.body.password
  const user = await User.findUser(userIdentifier)
  try {
    if (!user) {
      const error = new Error('user not found')
      error.statusCode = 404
      throw error
    }
    const passwordCorrect = await bcryptjs.compare(password, user.password)
    if (!passwordCorrect) {
      const error = new Error('user and password do not match')
      error.statusCode = 401
      throw error
    }
    const token = jwt.sign({
      user: user.username,
      userId: user._id.toString()
    }, 'SECRETsecret')
    res
      .status(200)
      .cookie('tau', token, { httpOnly: true, maxAge: 2592000000 }) // 1000 * 60 * 60 * 24 * 30
      .cookie('ccua', true, { maxAge: 2592000000 })
      .json({ msg: 'logged in' })
  } catch (err) {
    next(err)
  }
}

exports.forgotPassword = async (req, res, next) => {
  try {
    const userData = await User.findUser(req.body.restorePasswordIdentifier)
    if (userData) {
      const temporaryPassword = cryptoRandomString({ length: 10, type: 'url-safe'})
      await User.updateUserData(userData._id, {
        username: userData.username,
        email: userData.email,
        password: temporaryPassword
      })
      console.log(temporaryPassword)
      // send email with it
      createNewPasswordEmail
      const message = createNewPasswordEmail(userData.email, temporaryPassword)
      transporter.sendMail(message)
    }
    res.status(200).json({})
  } catch (err) {
    next(err)
  }
}

exports.logout = (req, res, next) => {
  res
    .status(200)
    .clearCookie('tau')
    .clearCookie('ccua')
    .json({ msg: 'log out' })
}