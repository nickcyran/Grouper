import '../styles/friends.css'

import { PageContent, Messaging, CreateDmPage } from '.'
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

import { GetFriends, GetDirectMessages } from '../controllers';
import axios from 'axios';

const Friend_Right = ({ profile_id }) => {
    const [pfp, setProfile_Pic] = useState();
    const [name, setName] = useState();
    const [bio, setBio] = useState();
    const [link, setLinks] = useState();

    useEffect(() => {
        axios.get('http://localhost:9000/getProfile', { params: { _id: profile_id } })
            .then((res) => {
                setProfile_Pic(res.data.pfp)
                setName(res.data.displayName)
                setBio(res.data.bio)
                setLinks(res.data.links)
            })
            .catch((err) => {
                console.log(err)
            }
            )
    }, [profile_id])

    return (
        <>
            User Profile
            <br />
            <img src={'http://localhost:9000/Images/' + pfp} />
            <p>
                Name: {name}
                <br />
                Biography: {bio}
                <br />
                Added Link: {link}
            </p>
        </>
    )
}

const FriendsDisplay = ({ setProfile }) => {
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
                {friends.length > 0 ?
                    <>
                        {friends.map((friend, index) => (
                            <div key={index} className="friendBox" onClick={() => setProfile(friend._id)}>
                                <div className="pfp">
                                    <img className="pfpInnards" src={'http://localhost:9000/Images/' + friend.profile.profile_pic} alt='pfp' />
                                </div>

                                <p> {friend.username}</p>
                            </div>
                        ))}
                    </>
                    : (
                        <div>No friends to display</div>
                    )}
            </div >
        </div>
    );
}

const Friend_Left = ({ setDm }) => {
    const [existingDms, setExistingDms] = useState([])
    const [createPageVisible, setCreatePageVisible] = useState(false)
    const [addRender, setAddRender] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:9000/getDirectMessages/', { params: { id: localStorage.getItem('userID') } })
            .then((res) => {
                console.log(res.data)
                setExistingDms(res.data)
            })
            .catch((err) => {
                console.error("No DirectMessages found", err)
            })
    }, [addRender]);

    const toggleRender = () => {
        setAddRender(!addRender)
    }

    return (

        <>
            <div className="leftSideBar">
                <div className="l_bar_head">
                    <div className="addDm" onClick={() => { setCreatePageVisible(!createPageVisible) }}>+</div>
                    <div className="msgTitle">Messages</div>
                </div>

                <div className="l_bar">
                    {existingDms.length > 0 ? existingDms.map((dm, index) => (
                        <div key={index} className="dmBox" onClick={() => { setDm(dm.directMessage.chatroom_id) }}>
                            <div className="dmIcon" />
                            <div className="dmName">{dm.usernames.join(', ')}</div>
                        </div>
                    ))
                        :
                        <div>No direct messages </div>
                    }
                </div>
            </div>
            {createPageVisible && <CreateDmPage set={setCreatePageVisible} toggleRender={toggleRender} />
            }
        </>
    );
}

const Friend_Main = ({ dm_id, setProfile }) => {
    useEffect(() => { console.log(dm_id) }, [dm_id])

    return (
        <div className='mainContent'>
            {!dm_id ?
                <FriendsDisplay setProfile={setProfile} />
                :
                <Messaging group={dm_id} />}
        </div>
    );
}

const Home = ({ selectedDm, setDm, homeClick }) => {
    const [selectedProfile, setSelectedProfile] = useState()

    useEffect(() => {
        if (!selectedDm) {
            setSelectedProfile(localStorage.getItem('userID'))
        }
    }, [selectedDm, homeClick])

    return (
        <div className="page">
            <Friend_Left setDm={setDm} />
            <Friend_Main dm_id={selectedDm} setProfile={setSelectedProfile} />
            <Friend_Right profile_id={selectedProfile} />
        </div>
    )
}


export default Home;
