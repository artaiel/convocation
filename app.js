const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');

const compression = require('compression')

const eventsRoutes = require('./routes/events')
const { mongoConnect } = require('./db/db')

const app = express()

app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }));

// allow fetching data on local default vue dev server
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
  next()
})

app.use(eventsRoutes)

app.use(express.static(path.join(__dirname, 'frontend', 'dist')))


mongoConnect(() => {
  app.listen(process.env.PORT || 5000)
})