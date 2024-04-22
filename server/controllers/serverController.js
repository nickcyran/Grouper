const Server = require ('../schemas/serverSchema');

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
    try {
        member_ref = req.body
        Server.find({"member_ID" :  member_ref_objID}) //should search for servers with member ref in memberID
        .then(serverList => {
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