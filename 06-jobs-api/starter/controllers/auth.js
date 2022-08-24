const User = require("../models/User")
const { StatusCodes } = require("http-status-codes")

const { BadRequestError, UnauthenticatedError } = require('../errors')
const register = async (req, res) => {
    const { name, password, email } = req.body
    if (!name || !password || !email) {
        throw new BadRequestError('provide values')
    }
    const user = await User.create({ ...req.body })
    const token = await user.getToken()
    res.status(StatusCodes.CREATED).send({ user, token })
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError('provide credentials')
    }
    const user = await User.findOne({ email })
    if (!user) {
        throw new UnauthenticatedError("proive valid credentials")
    }
    const token = user.getToken();
    const pass = await user.comparePass(password)
    if (!pass) {
        throw new UnauthenticatedError("proive valid credentials")
    }
    res.status(StatusCodes.OK).json({ user, token })
}

module.exports = {
    register, login
} 