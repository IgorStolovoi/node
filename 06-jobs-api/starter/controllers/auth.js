const User = require("../models/User")
const { StatusCodes } = require("http-status-codes")
const bcrypt = require('bcryptjs')

const { BadRequestError } = require('../errors')
const register = async (req, res) => {
    const { name, password, email } = req.body
    if (!name || !password || !email) {
        throw new BadRequestError('provide values')
    }

    res.status(StatusCodes.CREATED).send('register user')
}

const login = async (req, res) => {
    res.send('login user')
}

module.exports = {
    register, login
} 