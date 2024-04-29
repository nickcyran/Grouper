const User = require('../schemas/userSchema');
const Group = require('../schemas/groupSchema');
const Chat = require('../schemas/chatSchema');

exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        user.save()
        res.send(user)
    }
    catch (error) {
        res.status(500).send(error)
    }
};

exports.getUser = async (req, res) => {
    const username = req.query.username;
    const password = req.query.password;

    try {
        const user = await User.findOne({ username: username, password: password });
        console.log(user)
        if (!user) {
            res.status(500).send(error)
        }

        res.send(user)
    }
    catch (error) {
        res.status(500).send(error)
    }
};

exports.getProfile = async (req, res) => {
    const _id = req.query._id
    try{
        const user = await User.findOne({ _id : _id });
        let data = {
            f_name: user.f_name,
            l_name: user.l_name,
            pfp: user.profile.profile_pic,
            displayName: user.profile.display_name,
            bio: user.profile.biography,
            links: user.profile.links
        }
        res.send(data);
    }
    catch (error ){
        res.status(500).send(error)
    }
};

exports.updateProfile = async (req, res) => {
    try{    
        const editUser = await User.findById(req.body._id)
        editUser.f_name = req.body.f_name;
        editUser.l_name = req.body.l_name;
        const profile = {
            profile_pic: req.file.filename,
            biography: req.body.biography,
            links : req.body.links,
            display_name : req.body.display_name,
        }
        editUser.profile = profile;
        editUser.save();
        res.send(editUser);
    }
    catch (error){
        res.status(500).send(error)
    }
};

exports.updatePFP = async (req, res) => {
    try{
        const editUser = await User.findById(req.body._id)
        editUser.profile.profile_pic = req.file.filename;
        editUser.save();
        res.send(editUser.profile.profile_pic)
    }
    catch (error){
        res.status(500).send(error)
    }
};

exports.addToGroup = async (req, res) => {
    try {
        const { group_id, user_id } = req.body;

        const user = await User.findById(user_id);

        if (!(group_id in user.groups)) {
            user.groups.push(group_id);

            const group = await Group.findById(group_id);

            group.users.push(user_id)

            await group.save();
        }
        await user.save();

        res.send(user);
    }
    catch (error) {
        res.status(500).send(error)
    }
};

exports.getFriends = async (req, res) => {
    try {
        const id = req.query.id
        const user = await User.findById(id)

        const friendIds = user.friends.map(friend => friend._id);

        const populatedFriends = await User.find({ _id: { $in: friendIds } });

        res.send(populatedFriends);
    }
    catch (error) {
        res.status(500).send(error)
    }
};

exports.addFriend = async (req, res) => {
    try {
        const id = req.body.user_id
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).send("User not found");
        }

        user.friends.push(req.body.friend_id)
        await user.save();

        res.send(req.body.friend_id);
    }
    catch (error) {
        res.status(500).send(error)
    }
};

exports.getUsername = async (req, res) => {
    try {
        const id = req.query.id
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).send("User not found");
        }
        res.send(user.username);
    }
    catch (error) {
        res.status(500).send(error)
    }
};

exports.getGroups = async (req, res) => {
    try {
        const id = req.query.id
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).send("User not found");
        }
        res.send(user.groups);
    }
    catch (error) {
        res.status(500).send(error)
    }
};

exports.createDirectMessage = async (req, res) => {
    try {
        const members = req.body.members;

        var dm = new Chat();
        await dm.save();

        for (i in members) {
            const user = await User.findById(members[i]);

            var x = {
                members: members,
                chatroom_id: dm._id
            }

            user.directMessages.push(x);
            await user.save();
        }
    }
    catch (error) {
        res.status(500).send(error)
    }
}

exports.getDirectMessages = async (req, res) => {
    try {
        const id = req.query.id
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).send("User not found");
        }


        var dms = user.directMessages;
        var f = []

        for (var i in dms) {
            var usernames = []
            var members = dms[i].members

            for (var j in members) {
                usernames.push(await idToUsername(members[j]))
            }
            f.push({ usernames, directMessage: dms[i] })
        }

        res.send(f);
    }
    catch (error) {
        res.status(500).send(error)
    }
}

async function idToUsername(id) {
    return (await User.findById(id)).username
}