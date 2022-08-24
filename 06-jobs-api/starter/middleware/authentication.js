const jwt = require("jsonwebtoken")
const User = require("../models/User")
const { StatusCodes } = require("http-status-codes")

const { BadRequestError, UnauthenticatedError } = require('../errors')

const authMiddleWare = async function (req, res, next) {
    const token = req.headers.authorization.split(' ')
    console.log(token)
    if (!token[1] || token[0] !== 'Baerer') {
        throw new UnauthenticatedError('provide token')
    }
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError('provide credentials')
    }
    const user = await User.findOne({ email })
    if (!user) {
        throw new UnauthenticatedError("proive valid credentials")
    }
    const pass = await user.comparePass(password)
    if (!pass) {
        throw new UnauthenticatedError("proive valid credentials")
    }
    const verifyJwt = jwt.verify(token[1], process.env.JWT_SECRET)
    if (!verifyJwt) {
        throw new UnauthenticatedError('unverified token')
    }
    req.user = {
        name: user.name,
        id: user._id
    }
    next()
}

module.exports = authMiddleWare