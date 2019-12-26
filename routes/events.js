const express = require('express')

const router = express.Router()

const eventsControllers = require('../controllers/eventsControllers')
const isAuth = require('../middleware/isAuth')

router.get('/event/data/:eventId', isAuth, eventsControllers.getEventData)

router.post('/event/create', isAuth, eventsControllers.createEvent)

router.delete('/event/:eventId', isAuth, eventsControllers.deleteEvent)

router.post('/event/update-availability', isAuth, eventsControllers.updateEventAttendance)

router.post('/event/update-data', isAuth, eventsControllers.updateEventData)

module.exports = router