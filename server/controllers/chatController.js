const Chat = require('../schemas/chatSchema');

exports.getChat = async (req, res) => {
    try {
        const id = req.query.groupId;
        const chat = await Chat.findById(id);
       
        if (!chat) { 
            return res.status(404).send("Chat not found");
        }
        res.send(chat);
    }
    catch (error) { 
        res.status(500).send(error)
    }
}; 

exports.sendChat = async (req, res) => {
    try {
        const { group_id, user_id, message } = req.body;
 
        const chat = await Chat.findById(group_id);
        
        if (!chat) { 
            return res.status(404).send("Chat not found");
        }

        chat.messages.push({ user_id, message });
        await chat.save();

        res.send(chat);
    }
    catch (error) { 
        res.status(500).send(error)
    }
}; 


exports.createChat = async (req, res) => {
    try {
        console.log(req.body)
        const chatroom = new Chat(req.body);
        chatroom.save()
        console.log(`chat created! ${chatroom}`)
        res.send(chatroom)
    }
    catch (error) {
        res.status(500).send(error)
    }
};