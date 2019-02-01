const clientDAO = require('../dao/ClientMongoDAO')

var existClientId = async (id, next) => {
    return await clientDAO.findById(id).then((result) => {
        if (result > 0)
            return true
        return false
    }).catch(next)
}

var existClientCpf = async (cpf, next) => {
    return await clientDAO.findByCpf(cpf).then((result) => {
        if (result.length > 0)
            return true
        return false
    }).catch(next)
}

module.exports = {
    existClientId,
    existClientCpf
}