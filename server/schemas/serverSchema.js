const mongoose = require("mongoose")

const serverSchema = new mongoose.Schema({
    owner_ID: mongoose.Schema.Types.ObjectId, //set to user creating server
    serverName: String, //set upon creation
    admin_ID: [{type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }],
    member_ID: [{type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    channel_ID: [{type: mongoose.Schema.Types.ObjectId, ref: 'Channel' }],
    invite_ID: [{type: mongoose.Schema.Types.ObjectId, ref: 'Invite' }],
})
const Server = mongoose.model("server", serverSchema);
module.exports = Server;