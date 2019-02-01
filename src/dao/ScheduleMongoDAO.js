const schedule = require('../model/Schedule')

var findAll = async () => {
    return await schedule.find({})
}

var findById = async (id) => {
    return await schedule.findById({ _id: id })
}

var findByClientId = async (clientId) => {
    return await schedule.find({ clientId: clientId })
}

var findByProfessionalId = async (professionalId) => {
    return await schedule.find({ professionalId: professionalId })
}

var findByDate = async (date) => {
    return await schedule.find({ date: date })
}

var findByInitialTime = async (initialTime) => {
    return await schedule.find({ initialTime: initialTime })
}

var findByFinalTime = async (finalTime) => {
    return await schedule.find({ finalTime: finalTime })
}

var findByDateTime = async (date, initialTime, finalTime) => {
    return await schedule.find({
        $and: [
            { date: { $eq: date } },
            {
                $or: [
                    { initialTime: { $gte: initialTime, $lte: initialTime } },
                    { finalTime: { $gt: finalTime, $lte: finalTime } }
                ]
            }]
    })
}

var save = async (objSchedule) => {
    return await schedule.create(objSchedule)
}

var update = async (objSchedule) => {
    return await schedule.findByIdAndUpdate({ _id: objSchedule._id }, objSchedule)
}

var remove = async (objSchedule) => {
    return await schedule.findByIdAndRemove({ _id: objSchedule._id })
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