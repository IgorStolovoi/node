const jwt = require("jsonwebtoken")
const User = require("../models/User")
const { StatusCodes } = require("http-status-codes")

const { BadRequestError, UnauthenticatedError } = require('../errors')

const authMiddleWare = async function (req, res, next) {
    const auth = req.headers.authorization
    if (!auth || !auth.startsWith('Baerer ')) {
        throw new UnauthenticatedError('provide token')
    }
    const token = auth.split(' ')[1]
    if (!token) {
        throw new UnauthenticatedError('provide token')
    }
    try {
        const verifyJwt = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = {
            name: verifyJwt.name,
            id: verifyJwt.userId
        }
        next()
    }
    catch (err) {
        throw new UnauthenticatedError('unverified token')
    }
}

module.exports = authMiddleWare