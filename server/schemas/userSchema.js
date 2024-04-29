const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    f_name: String,
    l_name: String,

    username: {
        type: String, 
        unique: true
    },
    password: String,
    profile: {
        display_name:{
            type: String,
            default: function(){
                const _t = this;
                return  (_t.f_name + " " + _t.l_name);
            },
            ref: 'name'
        },
        profile_pic:{
            type: String,
            default: "default.png",
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
    calanders_id: [{ type: mongoose.Schema.Types.ObjectId }],
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
    directMessages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'directMessage'
    }],
    friends: [{
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
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