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

//get list of servers user is in/invited into
exports.getServerMembership = async (req, res) => {
    const userID = req.query.uID;
    var serverMemberList = [];
    try {
        Server.find() //get entire list of servers
        .then(serverList => { //trim down to those that have uID as a memvber
            for(var i=0; i < serverList.size(); i++)
            {
                if(serverList[i].member_ID.includes(userID))
                serverMemberList.push(serverList[i]);
            }
            res.json(serverMemberList)
        })
        .catch(err => res.json(err))
    }
    catch (error) {
    res.status(500).send(error)
    }
        
        /*.then({
            if(serverList.size() > 0){ //server list not empty
                res.json(serverList)
            }
            if (serverList.size() == 0) { //server list empty
                res.json("None")
            }
        })
        .catch(err => res.json(err))
    }
    catch (error) {
        res.status(500).send(error)
        } */
    // serverList.forEach(
    //    const foundRef = serverList.Member.includes(member_ref);
    //    if(foundRef == true) {

    //    }
   // )

   // if(serverList.size() > 0){ //server list not empty
   //     res.json(serverList)
  //  }
   // if (serverList.size() == 0) { //server list empty
    //    res.json("None")
   // }
}

exports.sendServerInvite = async (req,res) => {
    const id = req.query.sID; //server ID
    const invitedUName = req.query.invUser; //user ID -- AS STRING - NEED TO CONVERT TO OBJECTID
    //const invitedID = mongoose.Types.ObjectID(invitedID_crude); --having difficulty getting this to work -- get actual userID/username and find that via user

    Server.findOne({_id : id}) //find current server
        .then(server => {
            if(server) {
                console.log("selected Server: " + server._id + "(" + server.serverName + ")");
                User.findOne({ username : invitedUName}) //ensure that user(ID) exists
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

exports.getServerMembers = async (req, res) => {
    try {
        Server.find()
        .then(serverList => res.json(serverList.member_ID))
        .catch(err => res.json(err))
    }
    catch (error) {
    res.status(500).send(error)
    }
}

exports.getServerAdmins = async (req,res) => {
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

exports.getServerInvites = async (req, res) => {
    invite_ref = req.body
    const inviteList = Server.find({invite_ID : invite_ref })
    if(inviteList > 0){ //server list not empty
        res.json(inviteList)
    }
    else { //server list empty
        res.json("None")
    }
}

exports.createServerChannels = async (req,res) => {
    const id = req.query.sID; //server ID
    const newChannelName = req.query.cName; //user ID -- AS STRING - NEED TO CONVERT TO OBJECTID
    //const invitedID = mongoose.Types.ObjectID(invitedID_crude); --having difficulty getting this to work -- get actual userID/username and find that via user

    Server.findOne({ _id : id}) //find current server
        .then(server => {
            console.log("Server found: " + server._id)
            if(server) {
                console.log("selected Server: " + server._id + "(" + server.serverName + ")");
                console.log("new channel name: " + newChannelName)
                //eventually, should make sure that no channel in the same server can have the same name.. 
                const channelObj = {channelName : newChannelName};

                Channel.create(channelObj); //create new Channel
                Channel.findOne({ channelName : newChannelName }) //find newly created channel (prob easier way to do this but idk)
                .then(channel => {
                    if(channel == null) {
                        res.json("Error: Could not create channel")
                        console.log("error in creating channel")
                    }

                    else {
                        console.log("confirming that new channel obj was created: " + channel)
                        const newChannelID = channel._id;
                        server.channel_ID.push(newChannelID);
                        server.save()
                        res.json(newChannelID); //returns newly created channel id
                    }
                 })
            }
            else res.json("Error: Server not found")
        })
    }

exports.getServerChannels = async (req,res) => {
    const id = req.query.sID; //server id
    Server.findOne({_id : id}) //find current server
        .then(server => {
            if(server) {  
                Channel.find({ _id : server.channel_ID})
                .then(channelList =>{
                    if(channelList == null || channelList == "")
                        res.json("No channels in server.")
                    else
                        res.json(channelList) //.channelName
                })
                //get names of channels from channel ID
                /*
                let channelNames = [];

                //if no channels exist
                if(server.channel_ID == null)
                    res.json("No channels in server.")
                else {
                //find channel name and send to server
                    //for(var i=0; i < server.channel_ID.length(); i++)
                    server.channel_ID.forEach(
                    {
                        if(Channel.findOne({ _id : channel_ID}).channelName)
                        channelNames.push(Channel.findOne({ _id : channel_ID}).channelName);
                    })
                    res.json(channelNames)
                    }
                */
                } 
            else res.json("Error: Server not found")
        })
}