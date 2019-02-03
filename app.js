const express = require('express')
const bodyParser = require('body-parser')
const env = require('dotenv').config()
const mongoose = require('./src/config/MongoDBConfig')
// const mysql = require('./src/config/MysqlDBConfig')

var app = express()

app.use(bodyParser.json())

app.use('/api', require('./src/controller/ClientController'))
app.use('/api', require('./src/controller/ProfessionalController'))
app.use('/api', require('./src/controller/ScheduleController'))
app.use('/api', require('./src/controller/FirebaseController'))

app.use((err, req, res, next) => {
    console.error(err)
    res.status(422).send({ error: err.message })
})

app.get('/', (req, res, next) => {
    res.status(200).send({ message: 'Application is running...' })
})

app.listen(process.env.PORT, () => {
        console.log(`Listening in ${process.env.NODE_ENV}...`)
})