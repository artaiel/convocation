const Event = require('../models/event')
const User = require('../models/user')

exports.getUserData = async (req, res, next) => {
  if (!req.userId) {
    const error = new Error('user not logged in')
    error.status = 403
    next(error)
  } else {
    const userData = await User.fetchUserById(req.userId)
    res.json({ msg: 'event info', userData: userData })
  }
}