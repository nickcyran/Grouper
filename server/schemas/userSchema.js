const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    f_name: String,
    l_name: String,
    username: String,
    password: String,
    
    profile: {
        display_name:{
            type: String,
            default: f_name + " " + l_name,
            ref: 'name'
        },
        profile_pic:{
            type: Image,
            default: null,
            ref: 'pfp'
        },
        biography: {
            type: String,
            default: "",
            ref: 'bio'
        },
        links:[{
            type: String,
            ref: 'link'
        }]
    },

    calanders_id: [{type: mongoose.Schema.Types.ObjectId}],

    groups: [{
        group_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'group'
        },
    }],

    availibility: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    
    directMessages: [{type: mongoose.Schema.Types.ObjectId}],

    friends: [{
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'  
        },
    }],

    events: [{
        event_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'event'
        },
    }],
});

const User = mongoose.model("user", userSchema);
module.exports = User;