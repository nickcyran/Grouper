const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    f_name: String,
    l_name: String,
    username: String,
    password: String,
    profile_id: mongoose.Schema.Types.ObjectId,
    
    calanders_id: [{type: mongoose.Schema.Types.ObjectId}],
    groups_id: [{type: mongoose.Schema.Types.ObjectId}],

    availibility: mongoose.Schema.Types.ObjectId,
    directMessages: [{type: mongoose.Schema.Types.ObjectId}],

    friends: [{
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'  
        },
    }]
});

const User = mongoose.model("user", userSchema);
module.exports = User;