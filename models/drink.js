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
        required: true
    },
    provenance: {
        type: String,
        required: true
    },
    vintage: {
        type: String,
        required: true
    },
    priceOne: {
        type: Number,
        required: true
    },
    priceTwo: {
        type: Number,
        required: true
    },
    priceThree: {
        type: Number,
        required: true
    },
    priceFour: {
        type: Number,
        required: true
    },
    priceFive: {
        type: Number,
        required: true
    },
    selectedPubs: [String],
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
