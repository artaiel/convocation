const express = require('express')

const userController = require('../controllers/userControllers')

const isAuth = require('../middleware/isAuth')

const router = express.Router()

router.get('/user/events', isAuth, userController.getUserData)

module.exports = router