const User  = require('../schemas/userSchema');
const Group  = require('../schemas/groupSchema');

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
    try{
        const user = await User.findOne({Username: username , Password: password });
        res.send(user)
    }
    catch (error){
        res.status(500).send(error)
    }
};

exports.getUserByID = async (req, res) => {
    const _id = req.query.user
    try{
        const user = await User.findOne({ _id : _id });
        res.send(user);
    }
    catch (error ){
        res.status(500).send(error)
    }
};

exports.addToGroup = async (req, res) => {
    try {
        const {group_id, user_id} = req.body;
        
        const user = await User.findById(user_id);
        
        if(!(group_id in user.groups)){
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
        const user = await User.findById(id);
        
        if (!user) { 
            return res.status(404).send("User not found");
        }
        res.send(user.friends);
    }
    catch (error) { 
        res.status(500).send(error)
    }
}; 

exports.addFriend = async (req, res) => {
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