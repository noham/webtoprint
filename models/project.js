const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    projectTitle: {
        type: String,
        required: true
    },
    formats: {
        type: String,
        required: false
    },
    otherFormatSize: {
        type: String,
        required: false
    },
    ShortSummary: {
        type: String,
        required: false
    },
    ProposedTitle: {
        type: String,
        required: false
    },
    OfferDescription: {
        type: String,
        required: false
    },
    CalltoActions: {
        type: String,
        required: false
    },
    teamMember: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: false
    },
    clientName: {
        type: String,
        required: true
    },
    comments: {
        type: String,
        required: false
    },
    deadline: {
        type: String,
        required: false
    },
    trafficColor: {
        type: String,
        required: false
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('project', projectSchema)
