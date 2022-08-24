const User = require("../models/User")
const { StatusCodes } = require("http-status-codes")

const { BadRequestError, UnauthenticatedError } = require('../errors')
const register = async (req, res) => {
    const { name, password, email } = req.body
    if (!name || !password || !email) {
        throw new BadRequestError('provide values')
    }
    const user = await User.create({ ...req.body })
    const token = user.getToken()
    res.status(StatusCodes.CREATED).send({ user, token })
}

const login = async (req, res) => {
    res.status(StatusCodes.OK).json({ user: req.user })
}

module.exports = {
    register, login
} 