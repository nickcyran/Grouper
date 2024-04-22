const Chat = require('../schemas/chatSchema');
const User  = require('../schemas/userSchema');

exports.getChat = async (req, res) => {
    var knownUserNames = {}

    try {
        const id = req.query.id
        const chat = await Chat.findById(id);

        if (!chat) { 
            return res.status(404).send("Chat not found");
        }
    
        var messages = [];
    
        for (const msg of chat.messages) {
            var usrID = msg.user_id;

            if(usrID == null){
                continue;
            }
            else if (!(usrID in knownUserNames)) {
                knownUserNames[usrID] = (await User.findById(usrID)).username;
            } 
            
            messages.push({
                user_id: usrID,
                username: knownUserNames[usrID],
                message: msg.message,
                _id: msg._id
            });
        }
        res.send(messages);
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
        const chatroom = new Chat(req.body);
        chatroom.save()
        console.log(`chat created! ${chatroom}`)
        res.send(chatroom)
    }
    catch (error) {
        res.status(500).send(error)
    }
};