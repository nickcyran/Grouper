const User  = require('../schemas/userSchema');

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