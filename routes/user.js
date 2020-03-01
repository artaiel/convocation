const express = require('express')

const userController = require('../controllers/userControllers')

const isAuth = require('../middleware/isAuth')

const router = express.Router()

router.get('/user/events', isAuth, userController.getUserData)

// testing config vars
router.get('/cv', (req, res, next) => {
  res.status(200).json({
    msg: process.env
  })
})

router.post('/user/update', isAuth, userController.updateUserData)

router.delete('/user/delete', isAuth, userController.deleteUser)

module.exports = router