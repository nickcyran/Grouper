
import { accept, decline } from '../assets'
import axios from 'axios';
import { useState, useEffect } from 'react';

import '../styles/server.css'

const InviteCard = ({ invite, toggle, handleServerInvite }) => {
    return (
        <div className="inviteCard">
            <div className="ServerName">
                {invite.serverName}
            </div>

            <div className="InviteOptions">
                <div className="FriendOption">
                    <img src={accept} alt='accept invite' onClick={(e) => handleServerInvite(e, invite._id, "a")} />
                </div>

                <div className="FriendOption">
                    <img src={decline} alt='decline invite' onClick={(e) => handleServerInvite(e, invite._id, "d")} />
                </div>
            </div>
        </div>
    )
}

const ServerHome = ({refresh, toggle }) => {
    const [serverName, setServerName] = useState([])
    const [trigger, setTrigger] = useState(false)
    const [allServers, setAllServers] = useState([])
    const [userServers, setUserServers] = useState([])
    const tempUserServers = []
    const tempInvServers = []
    //const [serverMembers, setServerMembers] = useState([]) 
    //const [servers, setServers] = useState([]) 
    const [invites, setInvites] = useState([])

    //Toggle visibility of html
    const [serverCreation, setServerCreation] = useState(false); //toggle visibility of server creation
    //Set to false by default, changed in use effect if not false.

    const user_ID = localStorage.getItem('userID') //keep this part -- sets the owner/userID to the current user's ID


    //SERVER INVITATION ACCEPTION/DELETION ---------------------------------------------
    //call on button press --> resp = which button was pressed (['a']"accept" or ['d']"decline"). sID is just serverID
    const handleServerInvite = (event, sID, resp) => {
        //event.preventDefault()
        //update on server end (remove invite)
        axios.get('http://localhost:9000/declineServerInvite', { params: { sID: sID, cUser: user_ID } })
            .then(result => {
                if (resp !== "a")
                    alert("Declined server invitation.")
                refreshInvites()
                //not sure what to do here/if doing anything here is needed tbh
            })
            .catch(err => {
                console.log(err)
                alert("Issue when updating invited server status.")
            })


        if (resp === "a") { //if user accepts invite, they'd be added to members (don't need invite anymore, easier to call decline for all)
            //update on server end (move invite entry to member)
            axios.get('http://localhost:9000/acceptServerInvite', { params: { sID: sID, cUser: user_ID } })
                .then(result => {
                    alert("Joined server!")
                    refresh()
                    refreshInvites()
                })
                .catch(err => {
                    console.log(err)
                    alert("Issue when updating invited server status.")
                })
        }
    }

    //send server creation data to (MongoDB) server
    const handleServerCreation = (event) => {
        event.preventDefault()
        const owner_ID = user_ID

        if (serverName == "" || serverName == null) { //change to server name
            alert("Cannot enter a server without a valid name.")
        }
        else {
            //create maps/arrays for admin, members, etc... other values for server schema
            const admin_ID = user_ID
            const member_ID = user_ID

            axios.post('http://localhost:9000/createServer', { owner_ID, serverName, admin_ID, member_ID }) //logged-in user ID, Servername
                .then(result => {
                    console.log(result)
                    alert("Server created successfully")
                    refresh()
                    toggle()
                })
                .catch(err => {
                    console.log(err)
                    alert("Error while creating server")
                })
        }
    }

    //get what servers the user is in & has an invite to (exclusive) (look thru ServerSchema passing in user --> retrieve matches for "members" and "invites")
    useEffect(() => {
        //servers user is in
        // axios.get('http://localhost:9000/getUserServers', { params: { userID: user_ID } })
        //     .then(result => {
        //         setUserServers(result.data)
        //         console.log("user servers: " + result.data)
        //     })
        //     .catch(err => console.log(err))

        //servers user is invited to
        axios.get('http://localhost:9000/getUserServerInvites', { params: { userID: user_ID } })
            .then(result => {
                setInvites(result.data)
                console.log(result.data)
            })
            .catch(err => console.log(err))

    }, [trigger])



    const refreshInvites = () => {
        setTrigger(!trigger)
    }

    //for toggling visibility of server creation menu
    const openServerCreation = () => {
        setServerCreation(true)
    }
    const closeServerCreation = () => {
        setServerCreation(false)
    }

    /*
    {(allServers != "") && (
        <p>
        {allServers.map((server)=> {
        return <Link to={`/Server/${server._id}`}>{server.serverName}</Link>})}
        </p>
    )}
    */

    //4/20/24 NOTE: using all servers rather than just servers user is a member in since that get function still needs work
    return (
        <div className="serverhubform">
            <div className="innerForm">
                <div className="x" onClick={toggle}>
                    x
                </div>

                <h1 style={{ fontSize: "2rem" }}>SERVERS</h1>

                {!serverCreation && (
                    <button className="serverButton shadow" type="button" onClick={openServerCreation}> New server </button>)}

                {serverCreation && (
                    <div className="serverCreation">
                        <form onSubmit={handleServerCreation}>
                            <h3> Create a Server</h3>
                            <input type="text" 
                                placeholder="Enter server name" 
                                autoComplete="off"
                                id="serverName"
                                name="serverName"
                                onChange={(event) => setServerName(event.target.value)} 
                            />
                            <br></br>
                            <button type="submit">Create</button>
                            <button type="button" onClick={closeServerCreation}>Cancel</button>
                        </form>
                    </div>)}

                <div>
                    <div className="formtitle">Pending Invites:</div>
                    <div className="friendInvites">
                        {invites.length === 0 && <div className="noInvte"> no invites</div>}
                        {invites.map((invite, key) => (
                            <InviteCard key={key} invite={invite} toggle={refreshInvites} handleServerInvite={handleServerInvite} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}




export default ServerHome;