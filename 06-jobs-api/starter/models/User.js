const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'u need provide a name'],
        minlength: 3,
        maxlengt: 10
    },
    email: {
        type: String,
        require: [true, "provide email"],
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "provide valid email"],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'u need provide a name'],
        minlength: 6,
    }
})

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.getToken = function () {
    return jwt.sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    })
}

UserSchema.methods.comparePass = async function (pass) {
    const compared = await bcrypt.compare(pass, this.password)
    return compared
}
module.exports = mongoose.model("User", UserSchema);