const express = require('express')
const path = require('path')

const compression = require('compression')

const app = express()
const router = express.Router();

app.use(compression())

// allow fetching data on local default vue dev server
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
  next()
})

router.get('/api', (req, res, next) => {
  res.json({ "attendee": "Ana" })
})

app.use(router)

app.use(express.static(path.join(__dirname, 'frontend', 'dist')))
// app.use(express.static(path.join(__dirname, 'test')))

app.listen(process.env.PORT || 5000)