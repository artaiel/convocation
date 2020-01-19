const express = require('express')

const router = express.Router()

const eventsControllers = require('../controllers/eventsControllers')

router.get('/event/:eventId', eventsControllers.getEvent)

router.post('/event/create', eventsControllers.createEvent)

module.exports = router