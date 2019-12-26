const express = require('express')

const authController = require('../controllers/authControllers')

const router = express.Router()

router.post('/auth/signup', authController.signup)

router.post('/auth/login', authController.login)

router.get('/auth/logout', authController.logout)

router.post('/auth/forgot-password', authController.forgotPassword)

module.exports = router