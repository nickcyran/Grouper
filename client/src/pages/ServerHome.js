//Show users the servers that they're currently in and give users the option to create a new server.
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const ServerHome = () => {
    const [serverName, setServerName] = useState([]) 
    const [allServers, setAllServers] = useState([]) 
    const [userServers, setUserServers] = useState([])
    const tempUserServers = []
    //const [serverMembers, setServerMembers] = useState([]) 
    //const [servers, setServers] = useState([]) 
    const [invites, setInvites] = useState([]) 

    //Toggle visibility of html
    const [serverCreation, setServerCreation] = useState(false); //toggle visibility of server creation
    //Set to false by default, changed in use effect if not false.


    //TEMPORARY!! REMOVE ONCE USER IS FIXED/DONE
    //localStorage.setItem('loggedInUser', '661eeadeca5795c82406e572')
    const user_ID = localStorage.getItem('userID') //keep this part -- sets the owner/userID to the current user's ID

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

        axios.post('http://localhost:9000/createServer', {owner_ID, serverName, admin_ID, member_ID}) //logged-in user ID, Servername
        .then(result => {console.log(result)
        alert("Server created successfully")}) 
        .catch(err=> {console.log(err)
        alert("Error while creating server")})}
    } 

    //get what servers the user is in & has an invite to (exclusive) (look thru ServerSchema passing in user --> retrieve matches for "members" and "invites")
    useEffect(() => {
        //all servers
        axios.get('http://localhost:9000/getServers')
        .then((res)=> {
            setAllServers(res.data)

            //trim down to servers that have member in it
            for (var i =0; i<allServers.length; i++){
                if(allServers[i].member_ID.includes(user_ID))
                tempUserServers.push(allServers[i])
            }
            if(tempUserServers.length === 0)
            tempUserServers.push([{serverName : "Not in any servers."}])
            
            setUserServers(tempUserServers)
            console.log(userServers)
        })
        .catch(err=> console.log(err))
        
        /*
        //all server members
        axios.get('http://localhost:9000/getServerMembers')
        .then((res)=>{
            //console.log(res.data)
            setServerMembers(res.data)})
        .catch(err=> console.log(err))
        */

        
        //servers current user is in
        /*
        axios.get('http://localhost:9000/getServerMembership', {params: {uID : user_ID}})
        .then((res)=> {
            //console.log(res.data)
            if(res.data === null || res.data === "") //empty/none
                setServers([{serverName : "Not in any servers."}])
            else
                setServers(res.data)})
        .catch(err=> console.log(err))
        
        //servers current user is invited to
        axios.get('http://localhost:9000/getServerInvites', {params: {invite_ID : user_ID}})
        .then((res)=>setInvites(res.data))
        .catch(err=> console.log(err))
        */
    })

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
        <>
          <h1> SERVERS </h1>
          <div>
          <p>
                {userServers.map((server)=> {
                return <Link to={`/Server/${server._id}`}>{server.serverName}</Link>})}
          </p>
            
            {(invites != "None") && ( 
                <p> Currently invited to ...</p>
            )}
          </div>

         {!serverCreation && (
          <button type="button" onClick={openServerCreation}> New server </button>)}

          {serverCreation && (
            <div className="serverCreation">
            <form onSubmit={handleServerCreation}>
            <h3> Create a Server</h3>
            <input type="text" placeholder="Enter server name" autoComplete="off" id="serverName" name="serverName"  onChange={(event) => setServerName(event.target.value)}></input>
            <br></br>
            <button type="submit">Create</button>
            <button type="button" onClick={closeServerCreation}>Cancel</button>
            </form>
          </div> )}
          </>
     )

}

export default ServerHome;