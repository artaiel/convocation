const express = require('express')

const authController = require('../controllers/authControllers')

const router = express.Router()

router.post('/auth/signup', authController.signup)

router.post('/auth/login', authController.login)

module.exports = router