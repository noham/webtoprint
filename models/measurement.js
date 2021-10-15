const mongoose = require('mongoose')
const { stringify } = require('querystring')

const measurementSchema = new mongoose.Schema({
    measurement: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('measurement', measurementSchema)
