const mongoose = require("mongoose");

// simply setting this up for my sake; obv change whatever

const groupSchema = new mongoose.Schema({
    groupName: String,
    
    textChannels: [{
        channelName: String,
        channelChat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'chat'
        }
    }],
    groupOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }]

    //I needed this to work on messaging, but i think there should be like an array of admins
});

const Group = mongoose.model("group", groupSchema);
module.exports = Group;