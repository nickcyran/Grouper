import '../styles/friends.css'

import { Messaging, CreateDmPage, ProfileBar } from '.'
import { useState, useEffect } from 'react';
import { msg } from '../assets'

import { GetFriends } from '../controllers';
import axios from 'axios';

const Friend_Right = ({ profile_id, dm }) => {
    const [members, setMembers] = useState([])

    useEffect(() => {
        axios.get('', {params: {id: dm}})
        .then((res)=>{

        })
        .catch((err)=>{

        })
    }, [dm])

    return (
        <>
            {!dm ? <ProfileBar profile_id={profile_id} /> :
                <div className="rightSideBar">
                    <div className="title shadow" style={{ backgroundColor: "#2b2d31" }}>
                        Members
                    </div>

                    <div className="scroll profilebar">
                      
                    </div>
                </div>
            }
        </>

        // <div className="rightSideBar">

        // </div>
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
            <div className="title shadow">
                Friends
            </div>


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
                setExistingDms(res.data)
            })
            .catch((err) => {
                console.error("No DirectMessages found", err)
            })
    }, [addRender]);

    const toggleRender = () => {
        console.log("yo")
        setAddRender(!addRender)
    }

    return (
        <>
            <div className="leftSideBar">
                <div className="l_bar_head shadow">
                    <div className="addDm" onClick={() => {setCreatePageVisible(!createPageVisible)}}>+</div>
                    <div className="msgTitle">Messages</div>
                </div>

                <div className="l_bar">
                    {existingDms.length > 0 ? existingDms.map((dm, index) => (
                        <div key={index} className="dmBox" onClick={() => {setDm(dm.chatroom_id)}}>
                            <div className="dmName">{dm.title}</div>
                            <img className="dmImg" src={msg} alt='dm' />
                        </div>
                    ))
                        :
                        <div>No direct messages </div>
                    }
                </div>
            </div>
            {createPageVisible && <CreateDmPage set={setCreatePageVisible} toggleRender={toggleRender} />}
        </>
    );
}

const Friend_Main = ({ dm_id, setProfile }) => {
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
            <Friend_Right profile_id={selectedProfile} dm={selectedDm} />
        </div>
    )
}


export default Home;
