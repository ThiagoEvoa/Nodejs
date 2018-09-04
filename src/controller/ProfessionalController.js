const controller = require('express').Router()
const professionalDAO = require('../dao/ProfessionalDAO')
const professionalValidator = require('../validator/ProfessionalValidator')

controller.get('/professional', (req, res, next) => {
    professionalDAO.findAll().then((result) => {
        res.send(result)
    }).catch(next)
})

controller.get('/professional/id/:id', (req, res, next) => {
    professionalDAO.findById(req.params.id).then((result) => {
        res.send(result)
    }).catch(next)
})

controller.get('/professional/cpf_cnpj/:cpf_cnpj', (req, res, next) => {
    professionalValidator.existProfessionalCpfCnpj(req.body.cpf_cnpj).then((result) => {
        if (result) {
            professionalDAO.findByCpf_Cnpj(req.params.cpf_cnpj).then((result) => {
                res.send(result)
            }).catch(next)
        } else {
            res.status(422).send('Professional already exist with this CPF or CNPJ in database.')
        }
    })
})

controller.get('/professional/name/:name', (req, res, next) => {
    professionalDAO.findByName(req.params.name).then((result) => {
        res.send(result)
    }).catch(next)
})

controller.post('/professional', (req, res, next) => {
    professionalDAO.save(req.body).then((result) => {
        res.send(result)
    }).catch(next)
})

controller.put('/professional', (req, res, next) => {
    professionalDAO.update(req.body).then(() => {
        professionalDAO.findById(req.body._id).then((result) => {
            res.send(result)
        }).catch(next)
    }).catch(next)
})

controller.delete('/professional', (req, res, next) => {
    professionalDAO.remove(req.body).then((result) => {
        res.send(result)
    }).catch(next)
})

module.exports = controller