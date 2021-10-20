const mongoose = require('mongoose')
const { stringify } = require('querystring')

const prices = new mongoose.Schema({
        price:{
            type: Number,
            required: true
        },
        sizeMeasurement: {
            type: String,
            required: true
        }
  })

const perPub = new mongoose.Schema({
    measurements: [prices],
    selectedPubs: [String]
})

const drinkSchema = new mongoose.Schema({
    DrinkName: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: false
    },
    provenance: {
        type: String,
        required: false
    },
    vintage: {
        type: String,
        required: false
    },
    menuCatType: {
        type: String,
        required: true
    },
    perPubPricing: [perPub],
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('drink', drinkSchema)
