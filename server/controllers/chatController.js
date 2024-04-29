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
                knownUserNames[usrID] = (await User.findById(usrID))
            } 
            
            messages.push({
                user_id: usrID,
                pfp: knownUserNames[usrID].profile.profile_pic,
                username: knownUserNames[usrID].username,
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

exports.deleteMessage = async (req, res) => {
    try {
        const { chat_id, message_id } = req.body;
        
        const chat = await Chat.findById(chat_id);
        
        if (!chat) { 
            return res.status(404).send("Chat not found");
        }

        const messageIndex = chat.messages.findIndex(msg => msg._id.toString() === message_id);
        
        if (messageIndex === -1) {
            return res.status(404).send("Message not found in this chat");
        }

        chat.messages.splice(messageIndex, 1);
        await chat.save();

        res.send("Message deleted successfully");
    }
    catch (error) {
        res.status(500).send(error)
    }
};

exports.getMembers = async (req, res) => {
    try {
        const members = req.query.members
        const users = await User.find({ _id: { $in: members } }).select('username profile');

        res.send(users)
    }
    catch (error) {
        res.status(500).send(error)
    }
}