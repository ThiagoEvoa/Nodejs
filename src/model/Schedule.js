const mongoose = require('mongoose')
const schema = mongoose.Schema

const scheduleSchema = new schema({
    clientId:{
        type:String,
        required:true
    },
    professionalId:{
        type:String,
        required:true
    },
    date:{
        type: String,
        required: true,
        validate: [/^[0-9]{2}[-]{1}[0-9]{2}[-]{1}[0-9]{4}$/]
    },
    initialTime: {
        type: String,
        required: true,
        validate: [/^[0-9]{2}[:]{1}[0-9]{2}[:]{1}[0-9]{2}$/]
    },
    finalTime: {
        type: String,
        required: true,
        validate: [/^[0-9]{2}[:]{1}[0-9]{2}[:]{1}[0-9]{2}$/]
    },
})

const schedule = mongoose.model('schedule', scheduleSchema)
module.exports = schedule