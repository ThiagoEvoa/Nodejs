const controller = require('express').Router()
const clientDAO = require('../dao/ClientDAO')
const clientValidator = require('../validator/ClientValidator')

controller.get('/client', (req, res, next) => {
    clientDAO.findAll().then((result) => {
        res.send(result)
    }).catch(next)
})

controller.get('/client/:id', (req, res, next) => {
    clientDAO.findById(req.params.id).then((result) => {
        res.send(result)
    }).catch(next)
})

controller.get('/client/:cpf', (req, res, next) => {
    clientDAO.findByCpf(req.params.cpf).then((result) => {
        res.send(result)
    }).catch(next)
})

controller.get('/client/:name', (req, res, next) => {
    clientDAO.findByName(req.params.name).then((result) => {
        res.send(result)
    }).catch(next)
})

controller.post('/client', (req, res, next) => {
    clientValidator.existClientCpf(req.body.cpf).then((result) => {
        if (!result) {
            clientDAO.save(req.body).then((result) => {
                res.send(result)
            }).catch(next)
        } else {
            res.status(422).send({ error: 'Client already exist with this CPF in database.' })
        }
    }).catch(next)
})

controller.put('/client', (req, res, next) => {
    clientDAO.update(req.body).then(() => {
        clientDAO.findById(req.body._id).then((result) => {
            res.send(result)
        }).catch(next)
    }).catch(next)
})

controller.delete('/client', (req, res, next) => {
    clientDAO.remove(req.body).then((result) => {
        res.send(result)
    }).catch(next)
})

module.exports = controller