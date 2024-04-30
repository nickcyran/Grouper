import { icon, addGroup } from '../assets'
import { Home, Server, ServerHome } from '.'
import { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import axios from 'axios';

const Main = () => {
    const [onFriendsPage, setOnFriendsPage] = useState(true);
    const [selectedGroup, setSelectedGroup] = useState()
    const [homeButton, setHomeButton] = useState(false)
    const [servers, setServers] = useState([]);
    const [selectedServer, setSelectedServer] = useState();
    const [serverHubVisible, setServerHubVisible] = useState(false);
    const [refreshServers, setRefreshServers] = useState(false)

    const toggleServerHub = () => {
        setServerHubVisible(!serverHubVisible)
    }

    const refresh = () => {
        setRefreshServers(!refreshServers)
    }

    const HandleSwitchToServer = (server_id) => {
        setSelectedServer(server_id)
    }

    //replaced fetch data func with just axios sorry ik it looks gross but I tried the pretty way and it didn't work and I couldn't figure out why
    useEffect(() => {
        axios.get('http://localhost:9000/getUserServers', { params: { userID: localStorage.getItem('userID') } })
            .then(result => {
                setServers(result.data)
                //console.log("user servers: " + result.data + " length: " + result.data.length)
            })
            .catch(err => console.log(err))

        //console.log("saved servers: " + servers)
    }, [refreshServers])

    return (
        <div className="main">
            <div className="navBar">
                <div className="dmDir shadow" onClick={() => setOnFriendsPage(true)}>
                    <img src={icon} alt="direct messages" onClick={() => { setHomeButton(!homeButton); setSelectedGroup() }} />
                </div>

                {/* DISPLAY ALL OF THE USERS GROUPS */}
                {(servers.length > 0) && (
                    <div className="groupBar">
                        {servers.map((server, index) => (
                            <div className="square" key={index} onClick={() => {
                                HandleSwitchToServer(server._id)
                                setOnFriendsPage(false);
                            }} />
                        ))}
                    </div>)}

                <div className="serverHub">
                    <img src={addGroup} alt="add a server" onClick={toggleServerHub}/>
                </div>
            </div>
            <></>

            {onFriendsPage ? <Home selectedDm={selectedGroup} setDm={setSelectedGroup} homeClick={homeButton} /> : <Server server={selectedServer} />}
            {serverHubVisible && <ServerHome toggle={toggleServerHub} refresh={refresh}/>}
        </div>
    );
}

export default Main;