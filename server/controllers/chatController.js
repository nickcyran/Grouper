const Chat = require('../schemas/chatSchema');

exports.getChat = async (req, res) => {

}; 

exports.createChat = async (req, res) => {
    try {
        const chatroom = new Chat(req.body);
        console.log(chatroom)
        chatroom.save()
        console.log(`chat created! ${chatroom}`)
        res.send(chatroom)
    }
    catch (error) {
        res.status(500).send(error)
    }
};