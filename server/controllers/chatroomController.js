const Chatroom = require('../schemas/chatroomSchema');

exports.getChat = async (req, res) => {

};

exports.createChat = async (req, res) => {
    try {
        const chatroom = new Chatroom(req.body);
        chatroom.save()
        console.log(`chat created! ${chatroom}`)
        res.send(chatroom)
    }
    catch (error) {
        res.status(500).send(error)
    }
};