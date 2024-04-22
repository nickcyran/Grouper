import '../styles/friends.css'

import { PageContent, Messaging, CreateDmPage } from '.'
import { useState, useEffect} from 'react';

import { GetFriends, GetDirectMessages } from '../controllers';

const Friend_Right = () => {
    return (
        <>
            User Profile
            <p>empty - nonfunc requirement rn</p>
        </>
    )
}

const FriendsDisplay = () => {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setFriends(await GetFriends(localStorage.getItem('userID')));
        };

        fetchData();
    }, []);

    return (
        <div className="friends_main">
            Friends

            <div className="yourFriends">
                {friends.length > 0 ? (
                    friends.map((friend) => (
                        <div key={friend._id} className="friendBox">
                            <div className="pfp" />
                            <p> {friend.username}</p>
                        </div>
                    ))
                ) : (
                    <div>No friends to display</div>
                )}
            </div >
        </div>
    );
}

const Home = ({ group }) => {
    const [display, setDisplay] = useState();
    const [createDmVisible, setCreateDmVisible] = useState(false);

    const Friend_Main = () => {
        return (
            <>
                {!display ? <FriendsDisplay /> : <Messaging group={display} />}
                {createDmVisible && <CreateDmPage set={setCreateDmVisible}/>}
            </>
        )
    }

    const handleDmChange = (id) => {
        setDisplay(id)
    }

    const Home_Left = () => {
        const [dms, setDms] = useState([]);

        useEffect(() => {
            const fetchData = async () => {
                setDms(await GetDirectMessages(localStorage.getItem('userID')));
            };

            fetchData();
        }, []);

        return (
            <div>
                <div className="l_bar_head">
                    <div className="addDm" onClick={() => {setCreateDmVisible(!createDmVisible)}}>+</div>
                    <div className="msgTitle">Messages</div>

                </div>

                <div className="l_bar">
                    {dms.length > 0 ? (
                        dms.map((dm, index) => (
                            <div key={index} className="dmBox" onClick={() => handleDmChange(dm.directMessage.chatroom_id)}>
                                <div className="dmIcon" />
                                <div className="dmName">{dm.usernames.join(', ')}</div>
                            </div>
                        ))
                    ) : (
                        <div>No direct messages </div>
                    )}
                </div>
            </div>
        )
    }

    return <PageContent Left={Home_Left} Main={Friend_Main} Right={Friend_Right} group={group}/>
}

export default Home;
