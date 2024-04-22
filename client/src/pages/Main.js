import { messages_icon } from '../assets'
import { Friends, Group } from '.'
import { useState, useEffect } from 'react';
import axios from 'axios';

const Main = () => {
    const [groups, setGroups] = useState([]);
    const [group, setGroup] = useState(localStorage.getItem('currentGroup'));
    const [onFriendsPage, setOnFriendsPage] = useState(false);

    useEffect(() => {
        var user = localStorage.getItem('userID');
        axios.get('http://localhost:9000/getGroups/', { params: { id: user } })
        .then(res => {
            setGroups(res.data);
        })
        .catch((err) => {
            console.error('Error in getting Groups:', err);
        });
    }, [])

    function updateLocalStorage(updatedData) {
        if (group !== updatedData) {
            localStorage.setItem('currentGroup', updatedData);
            setGroup(updatedData);
        }
    };

    return (
        <div className="main">
            <div className="navBar">
                <div className="dmDir" onClick={() => {                 //MAKE THIS DYNAMIC U FUCKIN BOZO {im talking to myself ive gone crazy}
                    updateLocalStorage('6620518cd5a9031a80a56964')
                    setOnFriendsPage(true)
                }}>
                    <img src={messages_icon} alt="direct messages" />
                </div>

                <div className="groupBar">
                    {groups.map((group) => (
                        <div className="square" key={group._id} onClick={() => {
                            setOnFriendsPage(false);
                            updateLocalStorage(group._id)
                        }} />
                    ))}
                </div>
            </div>

            {/* WETHER FRIEND/DMS or GROUP IS DISPLAYED */}
            {onFriendsPage ? <Friends group={group} /> : <Group group={group} />}
        </div>
    );
}

export default Main;