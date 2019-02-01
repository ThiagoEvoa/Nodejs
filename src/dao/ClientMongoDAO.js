const client = require('../model/Client')

var findAll = async () => {
    return await client.find({})
}

var findById = async (_id) => {
    return await client.find({ _id: _id })
}

var findByCpf = async (cpf) => {
    return await client.find({ cpf: cpf })
}

var findByName = async (name) => {
    return await client.find({ name: name })
}

var save = async (objClient) => {
    return await client.create(objClient)
}

var update = async (objClient) => {
    console.log(objClient)
    return await client.findByIdAndUpdate({ _id: objClient._id }, objClient)
}

var remove = async (objClient) => {
    return await client.findByIdAndRemove({ _id: objClient._id })
}

module.exports = {
    findAll,
    findById,
    findByCpf,
    findByName,
    save,
    update,
    remove
}