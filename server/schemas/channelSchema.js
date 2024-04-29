const mongoose = require("mongoose")

const channelSchema = new mongoose.Schema({
    channelName: String, //set upon creation
    message_ID: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
})
const Channel = mongoose.model("channel", channelSchema);
module.exports = Channel;