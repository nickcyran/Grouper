import { messages_icon } from '../assets'
import { Home, Group } from '.'
import { useState, useEffect } from 'react';

import { GetUserGroups } from '../controllers'



const Main = () => {
    const [groups, setGroups] = useState([]);
    const [onFriendsPage, setOnFriendsPage] = useState(true);
    const [selectedGroup, setSelectedGroup] = useState()

    const HandleSwitchToGroup = (group_id) => {
        setSelectedGroup(group_id)
    }

    useEffect(() => {
        const fetchData = async () => {
            setGroups(await GetUserGroups({ id: localStorage.getItem('userID') }))
        };

        fetchData();
    }, [])

    return (
        <div className="main">
            <div className="navBar">
                <div className="dmDir" onClick={() => setOnFriendsPage(true)}>
                    <img src={messages_icon} alt="direct messages" />
                </div>

                {/* DISPLAY ALL OF THE USERS GROUPS */}
                <div className="groupBar">
                    {groups.map((group, index) => (
                        <div className="square" key={index} onClick={() => {
                            HandleSwitchToGroup(group._id)
                            setOnFriendsPage(false);
                        }} />
                    ))}
                </div>
            </div>

            {onFriendsPage ? <Home /> : <Group group={selectedGroup}/>}
        </div>
    );
}

export default Main;