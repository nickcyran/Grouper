const mongoose = require("mongoose");

// DMS / SERVERS: HOLDS A LIST OF MESSAGES (from msg schema) 
const chatSchema = new mongoose.Schema({                                  
    messages: [{
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'  
        },
        message: String
    }]
});

const Chat = mongoose.model("chat", chatSchema);

module.exports = Chat ;