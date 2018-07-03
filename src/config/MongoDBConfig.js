const env = require('dotenv').config();
const mongooseConfig = require('mongoose');
mongooseConfig.Promise = global.Promise;

mongooseConfig.connect(process.env.MONGO_CONNECTION);

mongooseConfig.connection.on('connected', () => {
    console.log('Mongoose connected');
});

mongooseConfig.connection.on('error', (err) => {
    console.log('Mongoose error: ' + err);
    process.exit(0);
});

mongooseConfig.connection.on('disconnect', () => {
    console.log('Mongoose disconnect');
});

module.exports = mongooseConfig;