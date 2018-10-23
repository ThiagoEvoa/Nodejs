const admin = require('firebase-admin')
const serviceAccount = require('./estudoandroid-ab3f3-firebase-adminsdk-x3384-3500bbb2c9')
const options = {
    priority: 'high',
    timeToLive: 60 * 60 * 24
}
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

var sendMessage = async (message) => {
    return await admin.messaging().send(message)
}
var sendMessageToUser = async (registrationtoken, payload) => {
    return await admin.messaging().sendToDevice(registrationtoken, payload, options)
}

// const registrationtoken = 'c0J9d8Q8Pgs:APA91bGyUlzJTnQJwbYoZd6zcmFuP7efo90apejRHtgZmJ_3QZGiv4hwY7uEmFbJ3oFxUknHjKc46se1ueY0VsydmXWhF_XekEZ76U1qxkARmeruYE8pFVW8P31e_rNYdwxgO-AC8Sim'
// const payload = {
//     data: {
//         title: 'title',
//         body: 'body'
//     }
// }
// const message = {
//     data:{
//         title:"title",
// 		body:"body"
//     },
//     topic: "all"
// }
// admin.messaging().send(message).then((response)=>{
//     console.log(`Success: ${response}`)
// }).catch((error)=>{
//     console.log(`Success: ${error}`)
// })

module.exports = { sendMessage, sendMessageToUser }