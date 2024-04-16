const mongoose = require("mongoose");

// DMS / SERVERS: HOLDS A LIST OF MESSAGES (from msg schema) 

const chatroomSchema = new mongoose.Schema({
    members: [String],              // users who belong to the chatroom

    messages: [{                    // messages in the room
        user_id: String,
        message: String,
    }],
});

const Chatroom = mongoose.model("chatroom", chatroomSchema);

module.exports = Chatroom;