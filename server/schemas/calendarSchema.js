const mongoose = require('mongoose');

const calendarSchema = new mongoose.Schema({
     cal_name: {
          type: String
     },
     owner: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
     },
     invited_users: {
          type: [mongoose.Schema.Types.ObjectId],
          ref: 'user',
          default: []
     },
     events: {
          type: mongoose.Schema.Types.ObjectId,
          default: []
     }
});

const Calendar = mongoose.model('calendar', calendarSchema);
module.exports = Calendar;
