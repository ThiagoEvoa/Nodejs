const scheduleDAO = require('../dao/ScheduleMongoDAO')

var existTimeAvailable = async (date, initialTime, finalTime, next) => {
    return await scheduleDAO.findByDateTime(date, initialTime, finalTime).then((result) => {
        if (result.length > 0)
            return true
        return false
    }).catch(next)
}

module.exports = {
    existTimeAvailable
}