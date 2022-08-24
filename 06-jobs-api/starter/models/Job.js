const mongoose = require("mongoose");

const JobSchema = mongoose.Schema({
    company: {
        type: String,
        required: [true, 'provide company name'],
        maxLength: 50
    },
    position: {
        type: String,
        required: [true, 'provide position'],
        maxLength: 100
    },
    status: {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'please provide a user']
    }

}, { timestamps: true })

module.exports = mongoose.model('Job', JobSchema)