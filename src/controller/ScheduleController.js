const controller = require('express').Router()
const scheduleDAO = require('../dao/ScheduleMongoDAO')
const scheduleValidator = require('../validator/ScheduleValidator')
const clientValidator = require('../validator/ClientValidator')
const professionalValidator = require('../validator/ProfessionalValidator')

controller.get('/schedule', (req, res, next) => [
    scheduleDAO.findAll().then((result) => {
        res.send(result)
    }).catch(next)
])

controller.get('/schedule/id/:id', (req, res, next) => {
    scheduleDAO.findById(req.params.id).then((result) => {
        res.send(result)
    }).catch(next)
})

controller.get('/schedule/clientid/:clientId', (req, res, next) => {
    scheduleDAO.findByClientId(req.params.clientId).then((result) => {
        res.send(result)
    }).catch(next)
})

controller.get('/schedule/professionalid/:professionalId', (req, res, next) => {
    scheduleDAO.findByProfessionalId(req.params.professionalId).then((result) => {
        res.send(result)
    }).catch(next)
})

controller.get('/schedule/date/:date', (req, res, next) => {
    scheduleDAO.findByDate(req.params.date).then((result) => {
        res.send(result)
    }).catch(next)
})

controller.get('/schedule/initialtime/:initialTime', (req, res, next) => {
    scheduleDAO.findByInitialTime(req.params.initialTime).then((result) => {
        res.send(result)
    }).catch(next)
})

controller.get('/schedule/finaltime/:finalTime', (req, res, next) => {
    scheduleDAO.findByFinalTime(req.params.finalTime).then((result) => {
        res.send(result)
    }).catch(next)
})

controller.get('/schedule/datetime/:date/:initialTime/:finalTime', (req, res, next) => {
    scheduleDAO.findByDateTime(req.params.date, req.params.initialTime, req.params.finalTime).then((result) => {
        res.send(result)
    }).catch(next)
})

controller.post('/schedule', (req, res, next) => {
    scheduleValidator.existTimeAvailable(req.body.date, req.body.initialTime, req.body.finalTime).then((resultSchedule) => {
        console.log(resultSchedule)
        if (!resultSchedule) {
            professionalValidator.existProfessionalId(req.body.professionalId).then((resultProfessional) => {
                console.log(resultProfessional)
                if (!resultProfessional) {
                    clientValidator.existClientId(req.body.clientId).then((resultClient) => {
                        console.log(resultClient)
                        if (!resultClient) {
                            scheduleDAO.save(req.body).then((result) => {
                                res.send(result)
                            }).catch(next)
                        } else {
                            res.status(422).send({ message: `Client doens't exist in database` });
                        }
                    }).catch(next)
                } else {
                    res.status(422).send({ message: `Professional doens't exist in database` });
                }
            }).catch(next)
        } else {
            res.status(422).send({ message: `Schedule already exist with this range in database.` });
        }
    }).catch(next)
})

controller.put('/schedule', (req, res, next) => {
    scheduleDAO.update(req.body).then(() => {
        scheduleDAO.findById(req.body._id).then((result) => {
            res.send(result)
        }).catch(next)
    }).catch(next)
})

controller.delete('/schedule', (req, res, next) => {
    scheduleDAO.remove(req.body).then((result) => {
        res.send(result)
    }).catch(next)
})

module.exports = controller