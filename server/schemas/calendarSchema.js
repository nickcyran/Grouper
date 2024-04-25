const mongoose = require('mongoose');

const calendarSchema = new mongoose.Schema({
     cal_name: {
          type: String,
          required: true
     },
     owner: {
          type: mongoose.Schema.Types.ObjectId,
          required: true
     },
     invited_users: {
          type: [mongoose.Schema.Types.ObjectId],
          default: []
     },
     events: {
          type: [mongoose.Schema.Types.ObjectId],
          default: []
     }
});

const Calendar = mongoose.model('calendar', calendarSchema);
module.exports = Calendar;
