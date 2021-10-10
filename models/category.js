const mongoose = require('mongoose')
const { stringify } = require('querystring')

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
    parentCategoryName: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('category', categorySchema)
