const express = require('express')

const router = express.Router()

const eventsControllers = require('../controllers/eventsControllers')
const isAuth = require('../middleware/isAuth')

router.get('/event/data/:eventId', isAuth, eventsControllers.getEventData)

router.post('/event/create', isAuth, eventsControllers.createEvent)

router.post('/event/update', isAuth, eventsControllers.updateEventAttendance)

module.exports = router