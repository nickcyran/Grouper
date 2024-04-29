const Server = require ('../schemas/serverSchema');
const User = require ('../schemas/userSchema');
const Channel = require ('../schemas/channelSchema');

//server creation
exports.createServer = async (req, res) => {
   Server.create(req.body)
        .then(servers => res.json(servers))
        .catch(err => res.json(err))
};

exports.getServers = async (req, res) => {
    try {
        Server.find()
        .then(serverList => res.json(serverList))
        .catch(err => res.json(err))
    }
    catch (error) {
    res.status(500).send(error)
    }
}

exports.getCurrentServer = async (req, res) => {
    const id = req.query.sID; //server ID
    Server.findOne({ _id : id}) //find current server
        .then(server => {
            if(server) {
                res.json(server)
            }
            else res.json("Error: Server not found")})
}

exports.changeServerName = async (req, res) => {
    const id = req.query.sID; //server ID
    const newServerName = req.query.nSN

    Server.findOne({ _id : id}) //find current server
        .then(server => {
            if(server) {
                server.serverName = newServerName
                server.save()
                res.json("Successfully changed server name.")
            }
            else res.json("Error: Server not found")})
}


exports.sendServerInvite = async (req,res) => {
    const id = req.query.sID; //server ID
    const invitedUName = req.query.invUser; //user ID -- AS STRING - NEED TO CONVERT TO OBJECTID
    //const invitedID = mongoose.Types.ObjectID(invitedID_crude); --having difficulty getting this to work -- get actual userID/username and find that via user

    Server.findOne({ _id : id}) //find current server
        .then(server => {
            if(server) {
                console.log("selected Server: " + server._id + "(" + server.serverName + ")");
                User.findOne({ username : invitedUName}) //ensure that user(ID) exists -- change to uID?
                .then(user => {
                    if(user != null) {
                        const invitedID = user._id;
                        console.log("invited userID " + invitedID + "(" + user.username + ")")
                        if(server.member_ID.includes(invitedID)) {    
                            console.log("user already in server")
                            res.json("Existing"); //member is already in server -- > cant invite
                        }
                        else if(server.invite_ID.includes(invitedID)) {    
                            console.log("user already sent invite")
                            res.json("Pre-Existing"); //member is already invited to server -- > cant invite
                        }//should add a check to make sure userID exists (ie. member._id : invitedID or smth)
                        else {
                            server.invite_ID.push(invitedID);
                            console.log("sent invitation")
                            server.save()
                            res.json("Sent");
                        }
                    }
                    else res.json("Error: No such user found");
            } 
            )}
            else res.json("Error: Server not found")
        })

}

//place in member_ID (call decline first)
exports.acceptServerInvite = async (req, res) => {
    console.log("In accept server invite")
    const servID = req.query.sID;
    const userID = req.query.cUser;

    console.log("Server: " + servID + " User: " + userID)
    Server.findById(servID)
    .then(server => {
        server.member_ID.push(userID)
        server.save()
        res.json("Added user to list of members.")
    })
    .catch(err => res.json(err))
}

//delete from invites
exports.declineServerInvite = async (req, res) => {
    console.log("In decline server invite")
    const servID = req.query.sID;
    const userID = req.query.cUser;

    console.log("Server: " + servID + " User: " + userID)
    Server.findById(servID)
    .then(server => {
        
        server.invite_ID.remove(userID)
        server.save()
        res.json("Removed user from invites")
    })
    .catch(err => res.json(err))
}

exports.getServerMembers = async (req, res) => {
    const id = req.query.sID;
        Server.findOne({_id : id}) //find current server
        .then(server => {
            User.find({ _id: {$in: server.member_ID}})
                .then(member => {
                    //console.log("serv.mem.: " + server.member_ID)
                    //console.log("members: " + member)
                    res.json(member) //return user refs for admins
                })
                .catch(err => {
                    console.log(err)
                    res.json("Error retrieving member user references")})
        })
        .catch(err => res.json(err))
    }

exports.removeServerMembers = async (req,res) => {
    const servID = req.query.sID;
    const userID = req.query.sUser;

    console.log("Server: " + servID + " User: " + userID)
    Server.findById(servID)
    .then(server => {
        //if user is also an admin
        if(server.admin_ID.includes(userID))
        server.admin_ID.remove(userID)

        server.member_ID.remove(userID)
        server.save()
        res.json("Removed user from server")
    })
    .catch(err => res.json(err))
}

//get user ref to owner
exports.getServerOwner = async (req,res) => {
    const id = req.query.sID;
    try {
        Server.findOne({_id : id}) //find current server
        .then(server => {
            User.findOne({ _id : server.owner_ID})
            .then(owner => {
                res.json(owner)
            })
            .catch(err => res.json(err))
        })
        .catch(err => res.json(err))
    }
    catch (error) {
    res.status(500).send(error)
    }
}

exports.getServerAdminStatus = async (req,res) => {
    const id = req.query.sID;
    const curUserID = req.query.admin;
    Server.findOne({_id : id}) //find current server
        .then(server => {
            if(server) {
                //if(server.admin_ID == admin_ID)  {
                if(server.admin_ID.includes(curUserID)) {    
                    res.json("admin")
                }
                else res.json("not_admin")
            }
            else res.json("Error: Server not found")
        })
}

//get admins in server
exports.getServerAdmins = async (req, res) => {
    const id = req.query.sID;
    Server.findOne({_id : id}) //find current server
        .then(server => {
            if(server) {
                //User.findById(server.admin_ID)
                User.find({ _id: {$in: server.admin_ID}})
                .then(admin => {
                    //console.log("server admins: " + server.admin_ID)
                    //console.log("admins: " + admin._id)
                    res.json(admin) //return user refs for admins
                })
                .catch(err => res.json("Error retrieving admin user references"))
            }
            else res.json("Error: Server not found")})
}

exports.addServerAdmins = async (req, res) => {
    const id = req.query.sID;
    const adminID = req.query.aID;
    Server.findOne({_id : id}) //find current server
        .then(server => {
            if(server) {
                server.admin_ID.push(adminID)
                server.save()
                res.json("Added user to list of admins.")
            }
            else res.json("Error: Server not found")
        })
           
}

exports.removeServerAdmins = async (req, res) => {
    const id = req.query.sID;
    const adminID = req.query.aID;
    Server.findOne({_id : id}) //find current server
        .then(server => {
            if(server) {
                server.admin_ID.remove(adminID)
                server.save()
                res.json("Removed user from list of admins.")
            }
            else res.json("Error: Server not found")
        })
}


exports.createServerChannels = async (req,res) => {
    Channel.create(req.body)
        .then(channel => res.json(channel))
        .catch(err => res.json(err))
    }


exports.addServerChannels = async (req,res) => {
    const id = req.query.sID; //server ID
    const newChannelName = req.query.cName; 
    //const invitedID = mongoose.Types.ObjectID(invitedID_crude); --having difficulty getting this to work -- get actual userID/username and find that via user
    console.log("In other channel function")

    Server.findOne({ _id : id}) //find current server
        .then(server => {
            console.log("Server found: " + server._id)
            if(server) {
                //eventually, should make sure that no channel in the same server can have the same name.. 
                //console.log("new channel id: " + newChannelID)
                console.log("Before channel call in other func")
                Channel.findOne({ channelName : newChannelName })
                .then(channel => { 
                    //console.log("Found channel! Channel ID: " + channel._id)
                    server.channel_ID.push(channel._id);
                    server.save()
                    res.json(channel._id); //returns newly created channel id
                })
            }
            else res.json("Error: Server not found")
        })
    }

exports.removeServerChannels = async (req,res) => {
    const id = req.query.sID; //server ID
    const cID = req.query.cID; 
    //const invitedID = mongoose.Types.ObjectID(invitedID_crude); --having difficulty getting this to work -- get actual userID/username and find that via user

    //delete channel
    Channel.findByIdAndDelete(cID)
    .then(result => {
        //remove from server
        Server.findOne({ _id : id}) //find current server
        .then(server => {
            console.log("Server found: " + server._id)
            if(server) {
                //remove channel from server
                server.channel_ID.remove(cID);
                server.save()
                res.json("Successfully removed channel from server."); //returns newly created channel id
            }
            else res.json("Error: Server not found")
        })
    })
    .catch(err => res.json(err))
}

exports.getServerChannels = async (req,res) => {
    const id = req.query.sID; //server id
    Server.findOne({_id : id}) //find current server
        .then(server => {
            if(server) {  
                Channel.find({ _id: {$in: server.channel_ID}})
                .then(channelList =>{
                    if(channelList == null || channelList == "")
                        res.json("No channels in server.")
                    else
                        res.json(channelList) //.channelName
                })
                } 
            else res.json("Error: Server not found")
        })
}