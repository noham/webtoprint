const mongoose = require('mongoose')
const { stringify } = require('querystring')

const measurementsSchema = new mongoose.Schema({
    measurementID: {
        type: String,
        required: false
    }
})
const savedData = new mongoose.Schema({
    listItemId:{
        type: String,
        required: false
    },
    listItemType:{
        type: String,
        required: false
    },
    listTextContent: {
        type: String,
        required: false
    },
    cssTextStyling: {
        type: String,
        required: false
    },
    measurements: [measurementsSchema]
})

const pageSchema = new mongoose.Schema({
    pageNum: {
        type: String,
        required: true
    },
    pageContents: [savedData]
})

const pubSchema = new mongoose.Schema({
    pubName: {
        type: String,
        required: false
    },
    pageSize:{
        type: String,
        required: true
    },
    savedDrinksList: [pageSchema],
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('pub', pubSchema)