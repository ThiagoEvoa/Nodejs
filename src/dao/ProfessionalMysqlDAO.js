const professional = require('../model/Professional')
const executeQuery = require('../config/MysqlDBConfig')
const env = require('dotenv').config()

var findAll = () => {
    return executeQuery(`SELECT * FROM ${process.env._DATABASE}.professional`)
}

var findById = (_id) => {
    return executeQuery(`SELECT * FROM ${process.env._DATABASE}.professional WHERE professional._id = ?`, [_id])
}

var findByCpf_Cnpj = (cpf_cnpj) => {
    return executeQuery(`SELECT * FROM ${process.env._DATABASE}.professional WHERE professional.cpf_cnpj = ?`, [cpf_cnpj])
}

var findByName = (name) => {
    return executeQuery(`SELECT * FROM ${process.env._DATABASE}.professional WHERE professional.name = ?`, [name])
}

var save = (objProfessional) => {
    return executeQuery(`INSERT INTO ${process.env._DATABASE}.professional (professional.cpf_cnpj, professional.name) VALUES (?,?)`, [objProfessional.cpf_cnpj, objProfessional.name])
}

var update = (objProfessional) => {
    return executeQuery(`UPDATE ${process.env._DATABASE}.professional SET professional.cpf_cnpj = ?, professional.name = ? WHERE professional._id = ?`, [objProfessional.cpf_cnpj, objProfessional.name, objProfessional._id])
}

var remove = async (objProfessional) => {
    return executeQuery(`DELETE FROM ${process.env._DATABASE}.professional WHERE professional._id = ?`, [objProfessional._id])
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