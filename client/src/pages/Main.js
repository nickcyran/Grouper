import { icon } from '../assets'
import { Home, Group, Server } from '.' 
import { useState, useEffect } from 'react';
import axios from 'axios';



import { GetUserGroups } from '../controllers'


const Main = () => {
    const [onFriendsPage, setOnFriendsPage] = useState(true);
    const [selectedGroup, setSelectedGroup] = useState()
    const [homeButton, setHomeButton] = useState(false)
    const [servers, setServers] = useState([]); 
    const [selectedServer, setSelectedServer] = useState();

    const HandleSwitchToServer = (server_id) => {
        setSelectedServer(server_id)
    }

    //replaced fetch data func with just axios sorry ik it looks gross but I tried the pretty way and it didn't work and I couldn't figure out why
    useEffect(() => {
        axios.get('http://localhost:9000/getUserServers', {params: {userID : localStorage.getItem('userID')}})
        .then(result => {
            setServers(result.data)
            //console.log("user servers: " + result.data + " length: " + result.data.length)
        })
        .catch(err => console.log(err))

        //console.log("saved servers: " + servers)
    }, [])

    return (
        <div className="main">
            <div className="navBar">
                <div className="dmDir shadow" onClick={() => setOnFriendsPage(true)}>
                    <img src={icon} alt="direct messages" onClick={()=> {setHomeButton(!homeButton); setSelectedGroup()}}/>
                </div>

                {/* DISPLAY ALL OF THE USERS GROUPS */}
                {(servers.length > 0 ) && (  
                    <div className="groupBar">
                    {servers.map((server, index) => (
                        <div className="square" key={index} onClick={() => {
                            HandleSwitchToServer(server._id)
                            setOnFriendsPage(false);
                        }} />
                    ))}
                    </div>)} 
            </div>
            <></>

            {onFriendsPage ? <Home selectedDm={selectedGroup} setDm={setSelectedGroup} homeClick={homeButton}/> : <Server server={selectedServer}/>}
        </div>
    );
}

export default Main;