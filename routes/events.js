const express = require('express')

const router = express.Router()

const eventsControllers = require('../controllers/eventsControllers')
const isAuth = require('../middleware/isAuth')

router.get('/event/data/:eventId', eventsControllers.getEventData)

router.post('/event/create', isAuth, eventsControllers.createEvent)

module.exports = router