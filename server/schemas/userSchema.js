const mongoose = require("mongoose");
//setting up basic info for my tests, as long as i have the _id its all good

// users are kind of gonna be a beefy model ----> elements to add
// i) user info (username, password, profile elements)
// ii) all ids of their existing servers/dms 
// iii) all exisitng friends

// controller needs to store user._id, username?

const userSchema = new mongoose.Schema({
    f_name: String,
    l_name: String,
    Username: String,
    Password: String,
    profile_id: mongoose.Schema.Types.ObjectId,
    messages: [{type: mongoose.Schema.Types.ObjectId}],
    calanders_id: [{type: mongoose.Schema.Types.ObjectId}],
    groups_id: [{type: mongoose.Schema.Types.ObjectId}],
    isAdmin_id: [{type: mongoose.Schema.Types.ObjectId}],
    availibility: mongoose.Schema.Types.ObjectId,
    friends: [{
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'  
        },
    }]
});

const User = mongoose.model("user", userSchema);
module.exports = User;