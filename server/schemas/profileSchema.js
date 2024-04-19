const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    display_name: String,
    belongs_to: mongoose.Schema.Types.ObjectId,
    pfp: Image,
    biography: String,
    links: [{String}]
});

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;