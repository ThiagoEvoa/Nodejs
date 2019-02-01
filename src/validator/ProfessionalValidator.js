const professinalDAO = require('../dao/ProfessionalMongoDAO')

var existProfessionalId = async (id, next) => {
    return await professinalDAO.findById(id).then((result) => {
        if (result > 0)
            return true
        return false
    }).catch(next)
}

var existProfessionalCpfCnpj = async (cpf_cnpj, next) => {
    return await professinalDAO.findByCpf_Cnpj(cpf_cnpj).then((result) => {
        if (result.length > 0)
            return true
        return false
    }).catch(next)
}

module.exports = {
    existProfessionalId,
    existProfessionalCpfCnpj
}