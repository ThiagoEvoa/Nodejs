const mongoose = require('mongoose')
const schema = mongoose.Schema
const cpfValidator = require('../validator/CpfValidator')

const clientSchema = new schema({
    cpf: {
        type: String,
        required: true,
        validate: [(cpf) => {
            return cpfValidator.validateCpf(cpf)
        }]
    },
    name: {
        type: String,
        required: true,
        maxlength: [50],
        minlength: [10]
    }
})

const client = mongoose.model('client', clientSchema)
module.exports = client