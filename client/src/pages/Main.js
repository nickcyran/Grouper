import { messages_icon } from '../assets'
import { Home, Group } from '.'
import { useState, useEffect } from 'react';

import { GetUserGroups } from '../controllers'

const HandleSwitchToGroup = (group_id) => {
    console.log(group_id)
}

const Main = () => {
    const [groups, setGroups] = useState([]);
    const [onFriendsPage, setOnFriendsPage] = useState(true);

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
                    {groups.map((group) => (
                        <div className="square" key={group._id} onClick={() => {
                            HandleSwitchToGroup(group._id)
                            setOnFriendsPage(false);
                        }} />
                    ))}
                </div>
            </div>

            {onFriendsPage ? <Home /> : <></>}
        </div>
    );
}

export default Main;