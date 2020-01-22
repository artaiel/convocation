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
    if (!decodedToken) { //check if it isn't undefined, which will happen if it wasn't able to verify
      const error = new Error('Not authenticated')
      error.statusCode = 401
      throw error
    }
    req.userId = decodedToken.userId // store in the req the userId for handler coming into play later
  }
  next()
}