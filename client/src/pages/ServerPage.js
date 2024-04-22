import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

//server home page, view channels by selecting them on side. admin has an option to go to a different page via. div w/ links (determine who has access via. search by userID)
const ServerPage = () => {
const {id} = useParams() //get the ref to the server id
const user_ID = localStorage.getItem('loggedInUser')
const [userStatus, setUserStatus] = useState([]) //whether user is a member or admin


useEffect(() => {
    //all servers
    //axios.get('http://localhost:9000/getMemberStatus')
    //.then((res)=>setAllServers(res.data))
    //.catch(err=> console.log(err))
    axios.get('http://localhost:9000/getServerAdmins', {params: {sID: id, admin : user_ID}})
        .then(result => {
            console.log(result)
            console.log("current user: " + user_ID)
            setUserStatus(result.data) //"admin" or "not_admin"
        })
})

    return (
        <div>
        <h1> ServerID: {id} </h1>
        <p>
            Currently in a server
        </p>
        </div>
    )
}

export default ServerPage