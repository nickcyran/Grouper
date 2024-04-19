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
    }]
});

const Group = mongoose.model("group", groupSchema);
module.exports = Group;