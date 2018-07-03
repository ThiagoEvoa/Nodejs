const professional = require('../model/Professional')

var findAll = async () => {
    return await professional.find({})
}

var findById = async (_id) => {
    return await professional.find({ _id: _id })
}

var findByCpf_Cnpj = async (cpf_cnpj) => {
    return await professional.find({ cpf_cnpj: cpf_cnpj })
}

var findByName = async (name) => {
    return await professional.find({ name: name })
}

var save = async (objProfessional) => {
    return await professional.create(objProfessional)
}

var update = async (objProfessional) => {
    return await professional.findByIdAndUpdate({ _id: objProfessional._id }, objProfessional)
}

var remove = async (objProfessional) => {
    return await professional.findByIdAndRemove({ _id: objProfessional._id })
}

module.exports = {
    findAll,
    findById,
    findByCpf_Cnpj,
    findByName,
    save,
    update,
    remove
}