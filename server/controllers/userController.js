const User = require('../schemas/userSchema');
const Group = require('../schemas/groupSchema');
const Chat = require('../schemas/chatSchema');
const DirectMessage = require('../schemas/directMessageSchema');

exports.createUser = async (req, res) => {
    try {
        const existingUser = await User.findOne({ username: req.body.username })

        if (existingUser) {
            res.send(false);
        }
        else {
            const user = new User(req.body);
            user.save()
            res.send(user)
        }
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
    try {
        const user = await User.findOne({ _id: _id });
        let data = {
            username: user.username,
            f_name: user.f_name,
            l_name: user.l_name,
            pfp: user.profile.profile_pic,
            displayName: user.profile.display_name,
            bio: user.profile.biography,
            links: user.profile.links
        }
        res.send(data);
    }
    catch (error) {
        res.status(500).send(error)
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const editUser = await User.findById(req.body._id)
        editUser.f_name = req.body.f_name;
        editUser.l_name = req.body.l_name;
        const profile = {
            profile_pic: req.file.filename,
            biography: req.body.biography,
            links: req.body.links,
            display_name: req.body.display_name,
        }
        editUser.profile = profile;
        editUser.save();
        res.send(editUser);
    }
    catch (error) {
        res.status(500).send(error)
    }
};

exports.updatePFP = async (req, res) => {
    try {
        const editUser = await User.findById(req.body._id)
        editUser.profile.profile_pic = req.file.filename;
        editUser.save();
        res.send(editUser.profile.profile_pic)
    }
    catch (error) {
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
        const { title, members } = req.body;
        const dm = new Chat();
        await dm.save();

        const directMessage = new DirectMessage({ title, members, chatroom_id: dm._id });
        await directMessage.save();

        await Promise.all(members.map(async (memberId) => {
            const user = await User.findById(memberId);

            if (!user) {
                throw new Error(`User with id ${memberId} not found`);
            }

            user.directMessages.push(directMessage);
            await user.save();
        }));

        res.send(directMessage);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

exports.getDirectMessages = async (req, res) => {
    try {
        const id = req.query.id

        const user = await User.findById(id).populate('directMessages');
        res.send(user.directMessages)
    }
    catch (error) {
        res.status(500).send(error)
    }
}

exports.sendFriendRequest = async (req, res) => {
    try {
        const { id, username } = req.body
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            if (existingUser._id.toString() === id) {
                res.status(400).send("You cannot friend yourself... sad")
            }
            else {
                if (existingUser.friendRequests.includes(id)) {
                    res.status(400).send("Friend request already sent.");
                } else {
                    existingUser.friendRequests.push(id);
                    await existingUser.save();
                    res.status(200).send("Friend request sent successfully.");
                }
            }
        }
        else {
            res.status(400).send("Could not find user by that name")
        }
    }
    catch (error) {
        res.status(500).send(error)
    }
}

exports.getFriendRequests = async (req, res) => {
    try {
        const id = req.query.id
        const user = await User.findById(id).populate({
            path: 'friendRequests',
            select: 'username profile'
        }).exec();

        res.send(user.friendRequests)
    }
    catch (error) {
        res.status(500).send(error)
    }
}