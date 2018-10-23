const controller = require('express').Router()
const messaging = require('../../Messaging')

controller.post('/sendmessage', (req, res, next) => {
    messaging.sendMessage(req.body.message).then((result) => {
        res.send(result)
    }).catch(next)
})

controller.post('/sendmessageuser', (req, res, next) => {
    messaging.sendMessageToUser(req.body.registrationtoken, req.body.payload).then((result) => {
        res.send(result)
    }).catch(next)
})

module.exports = controller