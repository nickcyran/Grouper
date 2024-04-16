const mongoose = require("mongoose");
//setting up basic info for my tests, as long as i have the _id its all good

// users are kind of gonna be a beefy model ----> elements to add
// i) user info (username, password, profile elements)
// ii) all ids of their existing servers/dms 
// iii) 

// controller needs to store user._id, username?

const userSchema = new mongoose.Schema({
    username: String
});

const User = mongoose.model("user", userSchema);
module.exports = User;