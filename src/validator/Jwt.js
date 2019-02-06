const jwt = require('jsonwebtoken')
const secret = 'mysecret'

const verifyToken = (token) => {
    return jwt.decode(token, secret)
}

const verifyAccess = (req, res, next) => {
    const token = req.headers['x-access-token']

    if (!token) return res.status(401).send({ auth: false, message: 'No token provided' })

    if (verifyToken(token)) {
        next()
    } else {
        res.status(401).send({ message: 'Invalid Token' })
    }
}

const token = (id) => {
    return jwt.sign({ id }, secret, {
        expiresIn: 300 //5min
    })
}

module.exports = { secret, verifyToken, verifyAccess, token }