const mongoose = require("mongoose")

const channelSchema = new mongoose.Schema({
    channelName: String, //set upon creation
    chatroom_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    }
})

const Channel = mongoose.model("channel", channelSchema);
module.exports = Channel;