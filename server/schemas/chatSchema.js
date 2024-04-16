const mongoose = require("mongoose");

// DMS / SERVERS: HOLDS A LIST OF MESSAGES (from msg schema) 
const chatSchema = new mongoose.Schema({
    members: [{                                     // users who belong to the chatroom
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'                                 // Reference to the User collection
    }],                                              
    messages: [{
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'  
        },
        message: String
    }]
});

const Chat = mongoose.model("chat", chatSchema);

module.exports = Chat ;