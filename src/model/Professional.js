const mongoose = require('mongoose')
const schema = mongoose.Schema
const cpfValidator = require('../validator/CpfValidator')
const cnpjValidator = require('../validator/CnpjValidator')

const professionalSchema = new schema({
    cpf_cnpj: {
        type: String,
        required: true,
        validate: [(cpf_cnpj) => {
            if (cpf_cnpj.length === 14)
                return cpfValidator.validateCpf(cpf_cnpj)
            return cnpjValidator.validateCnpj(cpf_cnpj)
        }]
    },
    name: {
        type: String,
        required: true,
        maxlength: [50],
        minlength: [10]
    }
})

const professional = mongoose.model('professional', professionalSchema)
module.exports = professional