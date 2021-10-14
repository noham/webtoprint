const mongoose = require('mongoose')
const { stringify } = require('querystring')

const categorySchema = new mongoose.Schema({
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

module.exports = mongoose.model('parentCategory', categorySchema)
