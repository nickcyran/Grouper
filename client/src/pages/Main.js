import { messages_icon } from '../assets'
import { Home, Group } from '.'
import { useState, useEffect } from 'react';
import axios from 'axios';

const Main = () => {
    const [groups, setGroups] = useState([]);
    const [onFriendsPage, setOnFriendsPage] = useState(true);
    const [selectedGroup, setSelectedGroup] = useState()

    useEffect(() => {
        axios.get('http://localhost:9000/getGroups/', { params: { id: localStorage.getItem('userID') }})
        .then((res) => {
            setGroups(res.data);
        })
        .catch((err) => {
            console.error("COULDNT FIND ANY GROUPS THE USER BELONGS TO")
        });
    }, [])

    return (
        <div className="main">
            <div className="navBar">
                <div className="dmDir" onClick={() => setOnFriendsPage(true)}>
                    <img src={messages_icon} alt="direct messages" onClick={()=> setSelectedGroup()}/>
                </div>

                {/* DISPLAY ALL OF THE USERS GROUPS */}
                <div className="groupBar">
                    {groups.map((group, index) => (
                        <div className="square" key={index} onClick={() => {
                            setSelectedGroup(group._id)
                            setOnFriendsPage(false);
                        }} />
                    ))}
                </div>
            </div>

            {onFriendsPage ? <Home  selectedDm={selectedGroup} setDm={setSelectedGroup}/> : <Group group={selectedGroup}/>}
        </div>
    );
}

export default Main;