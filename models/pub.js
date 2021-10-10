const mongoose = require('mongoose')
const { stringify } = require('querystring')

const savedData = new mongoose.Schema({
    listItemId:{
        type: String,
        required: true
    },
    listTextContent: {
        type: String,
        required: false
    }
})

const pubSchema = new mongoose.Schema({
    pubName: {
        type: String,
        required: true
    },
    savedDrinksList: [savedData],
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('pub', pubSchema)
