const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const axios = require('axios')
const logger = require('morgan')

const routes = require('./routes')

const port = process.env.PORT || 3000
const app = express()
// require('dotenv').config()
mongoose.connect('mongodb://localhost:27017/practice', { useNewUrlParser: true })
const connection = mongoose.connection

connection.once('open', function () {
  console.log('MongoDB database connection established successfully')
})

const api_key = 'AIzaSyADmybGtNPd_AlWlZ5ZQxT3EBtRnCqfhJo'

app.use(cors())
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', async (req, res) => {
  let response
  try {
    response = await axios.get('https://www.googleapis.com/books/v1/volumes')
    console.log(response.response.status)
  } catch (err) {
    console.log('err')
  } finally {
    res.end('<pre>', '</pre>')
  }
})
app.use(routes)
app.listen(port, () => {
  console.log('server running at http://localhost:3000')
})
