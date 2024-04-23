import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

//server home page, view channels by selecting them on side. admin has an option to go to a different page via. div w/ links (determine who has access via. search by userID)
const ServerPage = () => {
const {id} = useParams() //get the ref to the server id
const user_ID = localStorage.getItem('loggedInUser')
const [userStatus, setUserStatus] = useState([]) //whether user is a member or admin

//For admin permissions/controls
const [memberInvitation, setMemberInvitation] = useState(false)
const [inviteMemberID, setInviteMemberID] = useState([])

//for viewing/creating channels
const [channelCreation, setChannelCreation] = useState(false)
const [channels, setChannels] = useState([])
const [newChannelName, setNewChannelName] = useState([])

//INVITING USERS TO THE SERVER --------------------------------------------------
const handleMemberInvitation = (event) => { 
    axios.get('http://localhost:9000/sendServerInvite', {params: {sID: id, invUser : inviteMemberID}})
        .then(result => {
            //console.log(result)
            if(result === "Sent")
                alert("Successfully sent invite to user.");
            else if(result === "Pre-Existing")
                alert("Cannot invite user, they have already been sent an invite.");
            else if(result === "Existing")
                alert("Cannot invite user, they are already in the server.");
            else
                alert("Error inviting user to server.");
        })
}

const openMemberInvitation = () => {
    setMemberInvitation(true)
}
const closeMemberInvitation = () => {
    setMemberInvitation(false)
}

//CREATING/VIEWING CHANNELS ---------------------------------------------
const handleChannelCreation = (event) => {
    axios.get('http://localhost:9000/createServerChannels', {params: {sID: id, cName : newChannelName}})
        .then(result => {
            console.log(result)
            if(result.data != "Error: Server not found")
            alert("Channel created!");
            else
            alert("Error: Server not found. Could not create channel");
        })
}

const toggleChannelCreation = () => {
    setChannelCreation(!channelCreation)
}


useEffect(() => {
    //get whether or not current user is an admin
    axios.get('http://localhost:9000/getServerAdmins', {params: {sID: id, admin : user_ID}})
        .then(result => {
            //console.log("admin " + result)
            //console.log("current user: " + user_ID)
            setUserStatus(result.data) //"admin" or "not_admin"
        })

    axios.get('http://localhost:9000/getServerChannels', {params: {sID: id}})
        .then(result => {
            //console.log("channels " + JSON.stringify(result.data))
            setChannels(result.data)
        })
})

    return (
        <div>
        <h1> ServerID: {id} </h1>
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
                <input type="text" placeholder="Enter userID" autoComplete="off" id="inviteMemberName" name="inviteMemberName"  onChange={(event) => setInviteMemberID(event.target.value)}></input>
                <br></br>
                <button type="submit">Send invitation</button>
                <button type="button" onClick={closeMemberInvitation}>Cancel</button>
                </form>
                </div> )}
            <p>Removing Members</p>
            <p>Adding & Removing Channels</p>
            {!channelCreation && (
            <button type="button" onClick={toggleChannelCreation}> Create a new channel </button>)}

            {channelCreation && (
                <div className="channelCreation">
                <form onSubmit={handleChannelCreation}>
                <h3> Create a new channel</h3>
                <input type="text" placeholder="Enter channel name" autoComplete="off" id="newChannelName" name="newChannelName"  onChange={(event) => setNewChannelName(event.target.value)}></input>
                <br></br>
                <button type="submit">Create channel</button>
                <button type="button" onClick={toggleChannelCreation}>Cancel</button>
                </form> 
                </div>
            )}


            <p>Adding & Removing Admins</p>
            </div>
            ))
        }

        </div>
    )
}

export default ServerPage