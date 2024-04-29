import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

//server home page, view channels by selecting them on side. admin has an option to go to a different page via. div w/ links (determine who has access via. search by userID)
const ServerPage = () => {
const {id} = useParams() //get the ref to the server id
const user_ID = localStorage.getItem('userID')
const [userStatus, setUserStatus] = useState([]) //whether user is a member or admin
const [thisServer, setThisServer] = useState([]) //get a reference to current server (for server name display)
const [editingSN, setEditingSN] = useState(false)
const [newServerName, setNSN] = useState([])

    //For admin permissions/controls ----------------------------------------
    //channels
    const [channelCreation, setChannelCreation] = useState(false)
    const [channelRemoval, setChannelRemoval] = useState(false)

    //member invites/removal
    const [memberInvitation, setMemberInvitation] = useState(false)
    const [inviteMemberID, setInviteMemberID] = useState([])
    const [memberRemoval, setMemberRemoval] = useState(false)

    //admin addition/removal
    const [adminAddition, setAdminAddition] = useState(false)
    const [adminRemoval, setAdminRemoval] = useState(false)
    

    //for viewing/creating/removing channels
    const [channels, setChannels] = useState([]) //get channels
    const [newChannelName, setNewChannelName] = useState()
    const [newChannelID, setNewChannelID] = useState() //not used atm since channel ref by ID is buggy
    const [selectedC, setSelectedC] = useState([]) //selected channel (for channel removals)

    //for adding/removing admins and members
    const [membersE_OA, setMembersE_OA] = useState([]) //members excluding owner and admins -- for adding admins
    const [membersE_OU, setMembersE_OU] = useState([]) //members excluding owner and current user -- for removing members
    const [adminsE_OU, setAdminsE_OU] = useState([]) //admins excluding owner -- for removing admins - set under admin assignment
    const [members, setMembers] = useState([]) //all members
    const [admins, setAdmins] = useState([]) //admins
    const [owner, setOwner] = useState([]) //owner of server
    const [selectedU, setSelectedU] = useState([]) //selected user (for admin and member removals)

//INVITING USERS TO THE SERVER --------------------------------------------------
const handleMemberInvitation = (event) => { 
    if(inviteMemberID === null || inviteMemberID === "") 
    alert("Enter a username to invite a new user to the server.")

    else {
    axios.get('http://localhost:9000/sendServerInvite', {params: {sID: id, invUser : inviteMemberID}})
        .then(result => {
            //console.log(result)
            if(result.data === "Sent")
                alert("Successfully sent invite to user.");
            else if(result.data === "Pre-Existing")
                alert("Cannot invite user, they have already been sent an invite.");
            else if(result.data === "Existing")
                alert("Cannot invite user, they are already in the server.");
            else
                alert("Error inviting user to server.");
        })
    }
}

//VISIBILITY TOGGLES ---------------------------------------
    const openMemberInvitation = () => {
        setMemberInvitation(true)
        //set others to false
        setChannelCreation(false)
        setAdminAddition(false)
        setAdminRemoval(false)
        setMemberRemoval(false)
    }
    const closeMemberInvitation = () => {
        setMemberInvitation(false)
        //set others to false
        setChannelCreation(false)
        setAdminAddition(false)
        setAdminRemoval(false)
        setMemberRemoval(false)
    }

    const toggleChannelCreation = () => {
        setChannelCreation(!channelCreation)
        //set others to false
        setMemberInvitation(false)
        setAdminAddition(false)
        setAdminRemoval(false)
        setMemberRemoval(false)
    }

    const toggleChannelRemoval = () => {
        setChannelRemoval(!channelRemoval)

        //set others to false
        setMemberInvitation(false)
        setChannelCreation(false)
        setAdminAddition(false)
        setAdminRemoval(false)
        setMemberRemoval(false)
    }

    const toggleAdminAddition = () => {
        setAdminAddition(!adminAddition)
        //set others to false
        setMemberInvitation(false)
        setChannelCreation(false)
        setAdminRemoval(false)
        setMemberRemoval(false)
        setChannelRemoval(false)
        //setSelectedU("")
    }

    const toggleAdminRemoval = () => {
        setAdminRemoval(!adminRemoval)
        //set others to false
        setMemberInvitation(false)
        setChannelCreation(false)
        setAdminAddition(false)
        setMemberRemoval(false)
        setChannelRemoval(false)
        //setSelectedU("")
    }
    
    const toggleMemberRemoval = () => {
        setMemberRemoval(!memberRemoval)

        //set others to false
        setMemberInvitation(false)
        setChannelCreation(false)
        setAdminAddition(false)
        setChannelRemoval(false)
    }

    const toggleServerNameEdit = () => {
        setEditingSN(!editingSN)

        //set others to false
        setMemberInvitation(false)
        setChannelCreation(false)
        setAdminAddition(false)
        setChannelRemoval(false)
        setMemberRemoval(false)
    }

//CREATING/VIEWING CHANNELS ---------------------------------------------
const handleChannelCreation = (event) => {
    event.preventDefault()
    
    axios.post('http://localhost:9000/createServerChannels', {channelName : newChannelName})
        .then(result => {
            //console.log(result.data)
            //setNewChannelID(result.data[0]._id)
            handleChannelAddition() //calling outside to ensure channel was created
            if(result.data !== "Error: Server not found" && result.data !== "Error: Could not create channel")
            console.log(result.data._id);
            else
            alert("Error: Server not found. Could not create channel");
        })
}

function handleChannelAddition() {
    //console.log("New channel ID: " + newChannelID._id)
    //if(newChannelID !== null || newChannelID !== ""){
        axios.get('http://localhost:9000/addServerChannels', {params: {sID: id, cName : newChannelName}})
        .then(result => {
            console.log(result)
            if(result.data !== "Error: Server not found" && result.data !== "Error: Could not create channel") {
            console.log(result.data);
            window.location.reload();}
            else
            alert("Error: Server not found. Could not create channel");
        })
        
   // }
}


const handleServerNameEdit = (event) => {
    console.log("new server name: " + newServerName)
    if(newServerName === null || newServerName === "")
    alert("Cannot have a server with no name.");
    else{
        axios.get('http://localhost:9000/changeServerName', {params: { sID: id, nSN : newServerName}})
        .then(result => {
            alert(result.data)
            window.location.reload();
        })
        .catch(err => {console.log(err)})
    }
}

const handleChannelRemoval = (event) => {
    const cID = selectedC
    if (cID === null || cID === "") {
        alert("Error selecting a channel to remove.")
    }
    else {
        console.log("cid: " + cID)
        axios.get('http://localhost:9000/removeServerChannels', {params: { sID: id, cID : cID}})
        .then(result => {
            alert(result.data)
            setSelectedC("")
            window.location.reload();
        })
        .catch(err => console.log(err))
    }
}

const handleUserSelection = (event) => {
    setSelectedU(event.target.value);
}

const handleChannelSelection = (event) => {
    setSelectedC(event.target.value)
}

const handleAdminAddition = (event) => {
    //adID= admin ID
    console.log("selected admin: " + selectedU)
    const adID = selectedU
    if(adID === null || adID === "")
    alert("Error selecting member")
    else{
        axios.get('http://localhost:9000/addServerAdmins', {params: { sID: id, aID: adID}})
        .then(result => {
            alert("Added admin.")
            window.location.reload();})
        .catch(err => console.log(err))
        }
    }

 const handleAdminRemoval = (event) => {
    const adID = selectedU
    if(adID === null || adID === "")
    alert("Error selecting member")
    else{
        axios.get('http://localhost:9000/removeServerAdmins', {params: { sID: id, aID: adID}})
        .then(result => {
            alert("Removed admin.")
            window.location.reload();})
        .catch(err => console.log(err))
        }
 }

 const handleMemberRemoval = (event) => {
    const memID = selectedU
    if(memID === null || memID === "")
    alert("Error selecting member")
    else{
        axios.get('http://localhost:9000/removeServerMembers', {params: { sID: id, sUser: memID}})
        .then(result => {
            alert("Removed member.")
            window.location.reload();})
        .catch(err => console.log(err))
        }
 }

    useEffect(() => {
        //get whether or not current user is an admin
        axios.get('http://localhost:9000/getServerAdminStatus', { params: { sID: id, admin: user_ID } })
            .then(result => {
                //console.log("admin " + result)
                //console.log("current user: " + user_ID)
                setUserStatus(result.data) //"admin" or "not_admin"
            })
            .catch(err => console.log(err))

        //get reference to current server
        axios.get('http://localhost:9000/getCurrentServer', {params: { sID: id}})
        .then(result => {
            setThisServer(result.data)
        })
        .catch(err => console.log(err))


    axios.get('http://localhost:9000/getServerChannels', {params: {sID: id}})
        .then(result => {
           // console.log("channels " + JSON.stringify(result.data))
            if(result.data === null || result.data === "" || result.data === "No channels in server.") {
                const tempNoChannels = []
                tempNoChannels.push( {channelName : "No channels in server."} )
                //setChannels(tempNoChannels)
                setChannels([{channelName : "No channels in server."}])
            }
            else
            setChannels(result.data)
        })
    axios.get('http://localhost:9000/getServerOwner', {params: {sID :id}})
    .then(result => {
        setOwner(result.data)
    })
    .catch(err => console.log(err))
}, [])

    useEffect(() => {
        //get members, set excl. OA, set excl OU
    if(owner) {
    axios.get('http://localhost:9000/getServerAdmins', {params: {sID: id}})
    .then(result => {
        setAdmins(result.data)
        //set admin w/out owner and curr user
        const tempAdminExcl = []
        for(var i=0; i<result.data.length; i++) {
            if((result.data[i]._id !== owner._id)) 
            tempAdminExcl.push(result.data[i])
        }
        setAdminsE_OU(tempAdminExcl)
    })
    .catch(err => console.log(err))
    }}, [owner])

    useEffect(() => {
        if(admins){
            axios.get('http://localhost:9000/getServerMembers', {params: {sID: id}})
            .then(result => {
                //console.log("members: " + result.data[0]._id + " length: " + result.data.length)
                //console.log("admins: " + admins[0]._id + " length: " + admins.length)
               // console.log("owner: " + owner._id)
                setMembers(result.data)
                //find&set exclusions
                const tempExcl_OA = []
                const tempExcl_OU = []
                var tempIncl = ""
                for(var i=0; i<result.data.length; i++) {
                    //admin check
                    for(var j=0; j<admins.length; j++) {
                        if(result.data[i]._id === admins[j]._id)
                        tempIncl = "F"
                        //tempExcl_OA.push(result.data[i])
                    }
                    //add to admin&owner excl if true
                    if((tempIncl !== "F") && (tempExcl_OA.indexOf(result.data[i]._id) === -1))
                    tempExcl_OA.push(result.data[i])
                    //owner & curr user check
                    if((result.data[i]._id !== owner._id) && (result.data[i]._id !== user_ID) && (tempExcl_OU.indexOf(result.data[i]._id) === -1))
                        tempExcl_OU.push(result.data[i])
                    tempIncl = ""
                }
                //set vars outside of use effect
                setMembersE_OA(tempExcl_OA)
                console.log("excl OA :" + tempExcl_OA)
                setMembersE_OU(tempExcl_OU)
                console.log("Excl OU :" + tempExcl_OU)
            })
        }

    }, [admins])

    return (
        <div>
        <h1> Admin Page for {thisServer.serverName} </h1>
        <p>
            Currently in a server
        </p>
        
        <p> Channels: </p>
        {channels.map((channel)=> {
                return <p>{channel.channelName}</p>})}


            {(userStatus === "admin") && ((
                <div>
                    <h3>Admin permissions: </h3>
                    <p>Removing & Inviting Members</p>
                    {!memberInvitation && (
                        <button type="button" onClick={openMemberInvitation}> Invite a new member </button>)}

                    {memberInvitation && (
                        <div className="memberInvitation">
                            <form onSubmit={handleMemberInvitation}>
                                <h3> Invite a new member</h3>
                                <input type="text" placeholder="Enter userID" autoComplete="off" id="inviteMemberName" name="inviteMemberName" onChange={(event) => setInviteMemberID(event.target.value)}></input>
                                <br></br>

                                <button type="button" onClick={closeMemberInvitation}>Cancel</button>
                                <button type="submit">Send invitation</button>
                                
                            </form>
                        </div>)}
                    
                        <p> Removing Members </p>
                    {!memberRemoval && (
                        <button type="button" onClick={(toggleMemberRemoval)}> Remove a member from the server </button>
                    )}

                    {memberRemoval && (
                        <div>
                            {(membersE_OU && membersE_OU.length > 0) && (
                            <div>
                            <h3> Remove members</h3>
                            <select onChange={(e) => handleUserSelection(e, e.target.value)} value={selectedU}>
                                <option value=""> Select user</option>
                                {membersE_OU.map((member, index) => {
                                    return <option key={index} value={member._id}> {member.username} </option>
                                })}
                            </select>
                            <p></p>
                            <button type="button" onClick={(toggleMemberRemoval)}> Cancel </button> <button type="button" onClick={(handleMemberRemoval)}> Remove member </button> 
                            </div>
                            )}

                            {(!adminsE_OU || adminsE_OU.length === 0) && (
                            <p> No members in server that can be removed by the current user. </p>
                            )}

                        </div>

                    )}
                    

                    <p>Adding & Removing Channels</p>
                    {!channelCreation && (
                        <button type="button" onClick={toggleChannelCreation}> Create a new channel </button>)}

                    {channelCreation && (
                        <div className="channelCreation">
                            <form onSubmit={handleChannelCreation}>
                                <h3> Create a new channel</h3>
                                <input type="text" placeholder="Enter channel name" autoComplete="off" id="newChannelName" name="newChannelName" onChange={(event) => setNewChannelName(event.target.value)}></input>
                                <br></br>

                                <button type="button" onClick={toggleChannelCreation}>Cancel</button>
                                <button type="submit">Create channel</button>
                                
                            </form>
                        </div>
                    )}

                    {!channelRemoval && (
                        <button type="button" onClick={toggleChannelRemoval}> Remove a channel </button>)}

                    {channelRemoval && (
                        <div className="channelCreation">
                            {(!channels || channels.length === 0) && (
                                <p> No channels in server to remove.</p>
                            )}

                            {(channels && channels.length > 0) && (
                            <div>
                            <h3> Remove channels</h3>
                            <select onChange={(e) => handleChannelSelection(e, e.target.value)} value={selectedC}>
                                <option value=""> Select channel</option>
                                {channels.map((channel, index) => {
                                    return <option key={index} value={channel._id}> {channel.channelName} </option>
                                })}
                            </select>
                            <p></p>
                            <button type="button" onClick={(toggleChannelRemoval)}> Cancel </button> <button type="button" onClick={(handleChannelRemoval)}> Remove channel </button> 
                            </div>)}
                        </div>
                    )}


                    {(user_ID === owner._id) && (
                        <h3>Owner permissions: </h3>
                    )}

                    {(!adminAddition && (user_ID === owner._id)) && (
                        <div>
                        <p>Adding & Removing Admins</p>
                        <button type="button" onClick={(toggleAdminAddition)}> Add admins </button>
                        </div>
                    )}

                    {(adminAddition && (user_ID === owner._id)) && (
                        <div>
                            <p>Adding & Removing Admins</p>
                            {(membersE_OA && membersE_OA.length > 0) && (
                            <div>
                            <h3> Add admins</h3>
                            <select onChange={(e) => handleUserSelection(e, e.target.value)} value={selectedU}>
                                <option value=""> Select user</option>
                                {membersE_OA.map((member, index) => {
                                    return <option key={index} value={member._id}> {member.username} </option>
                                })}
                            </select>
                            <p></p>
                            <button type="button" onClick={(toggleAdminAddition)}> Cancel </button> <button type="button" onClick={(handleAdminAddition)}> Add admin </button> 
                            </div>
                            )}

                            {(!membersE_OA || membersE_OA.length === 0) && (
                            <p> No members in server that are not an admin. </p>
                            )}

                        </div>
                    )}

                    {(!adminRemoval && (user_ID === owner._id)) && (
                        <button type="button" onClick={(toggleAdminRemoval)}> Remove admins </button>
                    )}
                    {(adminRemoval && (user_ID === owner._id)) && (
                        <div>
                            {(adminsE_OU && adminsE_OU.length > 0) && (
                            <div>
                            <h3> Remove admins</h3>
                            <select onChange={(e) => handleUserSelection(e, e.target.value)} value={selectedU}>
                                <option value=""> Select user</option>
                                {adminsE_OU.map((member, index) => {
                                    return <option key={index} value={member._id}> {member.username} </option>
                                })}
                            </select>
                            <p></p>
                            <button type="button" onClick={(toggleAdminRemoval)}> Cancel </button> <button type="button" onClick={(handleAdminRemoval)}> Remove admin </button> 
                            </div>
                            )}

                            {(!adminsE_OU || adminsE_OU.length === 0) && (
                            <p> No members in server that can have their admin status revoked by the current user. </p>
                            )}

                        </div>
                    )}
                    <p></p>

                    {(!editingSN && (user_ID === owner._id)) && (
                        <button type="button" onClick={(toggleServerNameEdit)}> Edit server name </button>
                    )}

                    {(editingSN && (user_ID === owner._id)) && (
                        <div>
                        <input type="text" defaultValue={thisServer.serverName} autoComplete="off" id="newServerName" name="newServerName" onChange={(event) => setNSN(event.target.value)}></input>
                                <br></br>

                                <button type="button" onClick={closeMemberInvitation}>Cancel</button>
                                <button type="button" onClick={(handleServerNameEdit)}> Change server name </button>
                        </div>
                    )}

                </div>
            ))
            }
        </div>
    )
}

export default ServerPage