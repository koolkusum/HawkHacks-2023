
const mongoose = require('mongoose')
const UserModel = require('./Users')

const EventSchema = new mongoose.Schema ({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    interest: { //social, academic, service, or career
        type: String, 
        required: true,
        minlength: 1, 
        maxlength: 20
    },
    activity: { //name of actual activity, like career fair, hospital visit, study session, parties, etc. 
        type: String, 
        required: true,
        minlength: 1,
        maxlength: 40
    },
    desc: { //description of event
        type: String, 
        required: true, 
        minlength: 1,
        maxlength: 200
    },
    location: { //location of event
        type: String, 
        required: true,
        minlength: 1,
        maxlength: 50
    },
    date_time: {
        type: Date,
        required: true
    },
    attendees: {
        type: [UserModel],
        default: []
    }
})

const EventModel = mongoose.model("events", EventSchema);
module.exports = EventModel