const schedule = require('../model/Schedule')
const connection = require('../config/MysqlDBConfig')
const env = require('dotenv').config()

var findAll = () => {
    return executeQuery(`SELECT * FROM ${process.env._DATABASE}.schedule`)
}

var findById = (id) => {
    return executeQuery(`SELECT * FROM ${process.env._DATABASE}.schedule WHERE schedule._id = ?`, [id])
}

var findByClientId = (clientId) => {
    return executeQuery(`SELECT * FROM ${process.env._DATABASE}.schedule WHERE schedule.client_id = ?`, [clientId])
}

var findByProfessionalId = (professionalId) => {
    return executeQuery(`SELECT * FROM ${process.env._DATABASE}.schedule WHERE schedule.professional_id = ?`, [professionalId])
}

var findByDate = (date) => {
    return executeQuery(`SELECT * FROM ${process.env._DATABASE}.schedule WHERE schedule.date = ?`, [date])
}

var findByInitialTime = (initialTime) => {
    return executeQuery(`SELECT * FROM ${process.env._DATABASE}.schedule WHERE schedule.initial_time = ?`, [initialTime])
}

var findByFinalTime = (finalTime) => {
    return executeQuery(`SELECT * FROM ${process.env._DATABASE}.schedule WHERE schedule.final_time = ?`, [finalTime])
}

var findByDateTime = (date, initialTime, finalTime) => {
    return executeQuery(`SELECT * FROM ${process.env._DATABASE}.schedule WHERE schedule.date = ?
        AND
        (
            (schedule.initial_time BETWEEN ? AND ?)
        OR
            (schedule.final_time BETWEEN ? AND ?)
        )`
        , [date, initialTime, initialTime, finalTime, finalTime])
}

var save = (objSchedule) => {
    return executeQuery(`INSERT INTO ${process.env._DATABASE}.schedule
        (
        schedule.client_id, 
        schedule.professional_id, 
        schedule.date, 
        schedule.initial_time, 
        schedule.final_time
        )
        VALUES (?, ?, ?, ?, ?)`,
        [
            objSchedule.clientId,
            objSchedule.professionalId,
            objSchedule.date,
            objSchedule.initialTime,
            objSchedule.finalTime
        ]
    )
}

var update = (objSchedule) => {
    return executeQuery("UPDATE " + process.env._DATABASE + ".schedule SET " +
        "schedule.client_id = ?, " +
        "schedule.professional_id = ?, " +
        "schedule.date = ?, " +
        "schedule.initial_time = ?, " +
        "schedule.final_time = ? " +
        "WHERE schedule._id = ?",
        [
            objSchedule.clientId,
            objSchedule.professionalId,
            objSchedule.date,
            objSchedule.initialTime,
            objSchedule.finalTime,
            objSchedule._id
        ]
    )
}

var remove = (objSchedule) => {
    return executeQuery("DELETE FROM " + process.env._DATABASE + ".schedule WHERE schedule._id = ?", [objSchedule._id])
}

module.exports = {
    findAll,
    findById,
    findByClientId,
    findByProfessionalId,
    findByDate,
    findByInitialTime,
    findByFinalTime,
    findByDateTime,
    save,
    update,
    remove
}