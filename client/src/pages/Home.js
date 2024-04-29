import '../styles/friends.css'
import '../styles/page.css'

import { PageContent, Messaging, CreateDmPage } from '.'
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

import { GetFriends, GetDirectMessages } from '../controllers';
import axios from 'axios';

const Friend_Right = () => {
    const [pfp, setProfile_Pic] = useState();
    const [name, setName] = useState();
    const [bio, setBio] = useState();
    const [link, setLinks] = useState();

    useEffect(() => {
        const _id = localStorage.getItem('userID')
        axios.get('http://localhost:9000/getProfile', { params: { _id } })
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
    })
    return (
        <div className='rightSideBar'>
            User Profile
            <br />
            <div className="profilePic">
                <img className="pfpInnards" src={'http://localhost:9000/Images/' + pfp} />
            </div>

            <p>
                Name: {name}
                <br />
                Biography: {bio}
                <br />
                Added Link: {link}
            </p>
        </div>
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
                    friends.map((friend, index) => (
                        <div key={index} className="friendBox">
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

    const toggleRender = () =>{
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

            {createPageVisible && <CreateDmPage set={setCreatePageVisible} toggleRender={toggleRender}/>}
        </>
    );
}

const Friend_Main = ({ dm_id }) => {
    useEffect(() => { console.log(dm_id) }, [dm_id])

    return (
        <div className='mainContent'>
            {!dm_id ?
                <FriendsDisplay />
                :
                <Messaging group={dm_id} />}
        </div>
    );
}

const Home = ({ selectedDm, setDm }) => {
    return (
        <div className="page">
            <Friend_Left setDm={setDm} />
            <Friend_Main dm_id={selectedDm} />
            <Friend_Right />
        </div>
    )
}


export default Home;
