const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.cookies.tau || null
  if (token) {
    let decodedToken
    try {
      decodedToken = jwt.verify(token, 'SECRETsecret')
    } catch (err) {
      err.statusCode = 500
      throw err
    }
    if (!decodedToken) {
      const error = new Error('Not authenticated')
      error.statusCode = 401
      throw error
    }
    req.userId = decodedToken.userId
  }
  next()
}