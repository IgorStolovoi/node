const mongoose = require("mongoose");

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
        maxlengt: 12
    }
})

module.exports = mongoose.model("User", UserSchema);