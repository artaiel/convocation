const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');

const compression = require('compression')
const cookieParser = require('cookie-parser')

const authRoutes = require('./routes/auth')
const eventsRoutes = require('./routes/events')
const { mongoConnect } = require('./db/db')

const app = express()

app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser())

// allow fetching data on local default vue dev server
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

app.use(authRoutes)
app.use(eventsRoutes)

app.use((error, req, res, next) => {
  const status = error.statusCode || 500
  const message = error.message
  const data = error.data
  res.status(status).json({
    message,
    data
  })
})

app.use(express.static(path.join(__dirname, 'frontend', 'dist')))


mongoConnect(() => {
  app.listen(process.env.PORT || 5000)
})