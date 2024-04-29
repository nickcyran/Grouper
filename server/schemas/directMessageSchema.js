const mongoose = require("mongoose")

const directMessageSchema = new mongoose.Schema({
    title: String,
    members:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    chatroom_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    }
})

const DirectMessage = mongoose.model("directMessage", directMessageSchema);
module.exports = DirectMessage;