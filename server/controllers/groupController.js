const Group  = require('../schemas/groupSchema');
const Chat  = require('../schemas/chatSchema');
const User = require('../schemas/userSchema');

exports.createGroup = async (req, res) => {
    try {
        // I am so so so sorry for not commenting........
        const group = new Group(req.body);
        group.users.push(req.body.groupOwner)
        const user = await User.findById(req.body.groupOwner);

        user.groups.push(group._id)
        await user.save();

        var general = new Chat();
        await general.save();

        group.textChannels.push({channelName: "general", channelChat: general._id})   //create a general channel on start
        group.save()

        res.send(group)
    }
    catch (error) {
        res.status(500).send(error)
    }
};

exports.getTextChannels = async (req, res) => {
    try {
        const id =  req.query.id
        const group = await Group.findById(id)
        
        res.send(group.textChannels);
    }
    catch (error) {
        res.status(500).send(error)
    }
};