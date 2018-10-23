const express = require('express')
const bodyParser = require('body-parser')
const env = require('dotenv').config()
const mongoose = require('./src/config/MongoDBConfig')

var app = express()

app.use(bodyParser.json())

app.use('/api', require('./src/controller/ClientController'))
app.use('/api', require('./src/controller/ProfessionalController'))
app.use('/api', require('./src/controller/ScheduleController'))
app.use('/api', require('./src/controller/FirebaseController'))

app.use((err, req, res, next) => {
    console.log(err)
    res.status(422).send({ error: err.message })
})

app.get('/', (req, res, next) => {
    res.status(200).send({ message: 'Application is running...' })
})

app.listen(process.env.PORT, () => {
    if (process.env.NODE_ENV === 'production') {
        console.log('Listening in production...')
    } else {
        console.log('Listening in localhost on port ' + process.env.PORT + '...')
    }
})