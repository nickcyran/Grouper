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