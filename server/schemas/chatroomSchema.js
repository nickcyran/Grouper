const mongoose = require("mongoose");

// DMS / SERVERS: HOLDS A LIST OF MESSAGES (from msg schema) 

const chatroomSchema = new mongoose.Schema({
    members: [mongoose.Schema.Types.ObjectId],              // users who belong to the chatroom
    
    messages: [{                                            // messages in the room
        user_id: mongoose.Schema.Types.ObjectId,
        message: String,
    }],
});

const Chatroom = mongoose.model("chatroom", chatroomSchema);

module.exports = Chatroom;