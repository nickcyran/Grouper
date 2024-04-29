const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    event_name: {
        type: String,
        required: true
    },
    event_description: {
        type: String,
        required: true
    },
    event_tags: {
        type: [String],
        default: []
    },
    invited_users: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'user',
        default: []
    },
    start_date: {
        type: Date,
    },
    end_date: {
        type: Date,
    },
    date_created: {
        type: Date,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
});

const Event = mongoose.model('event', eventSchema);
module.exports = Event;
