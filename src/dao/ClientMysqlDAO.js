const client = require('../model/Client')
const executeQuery = require('../config/MysqlDBConfig')
const env = require('dotenv').config()

var findAll = ()=>{
    return executeQuery(`SELECT * FROM ${process.env._DATABASE}.client`)
}

var findById = (_id) => {
    return executeQuery(`SELECT * FROM ${process.env._DATABASE}.client WHERE client._id = ?`, [_id])
}

var findByCpf = (cpf) => {
    return executeQuery(`SELECT * FROM ${process.env._DATABASE}.client WHERE client.cpf = ?`, [cpf])
}

var findByName = (name) => {
    return executeQuery(`SELECT * FROM ${process.env._DATABASE}.client WHERE client.name = ?`, [name])
}

var save = (objClient) => {
    return executeQuery(`INSERT INTO ${process.env._DATABASE}.client (client.cpf, client.name) VALUES (?,?)`, [objClient.cpf, objClient.name])
}

var update = (objClient) => {
    return executeQuery(`UPDATE ${process.env._DATABASE}.client SET client.cpf = ?, client.name = ? WHERE client._id = ?`, [objClient.cpf, objClient.name, objClient._id])
}

var remove = (objClient) => {
    return executeQuery(`DELETE FROM ${process.env._DATABASE}.client WHERE client._id = ?`, [objClient._id])
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