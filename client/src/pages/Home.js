import '../styles/friends.css'

import { Messaging, CreateDmPage, ProfileBar, FriendHub } from '.'
import { useState, useEffect } from 'react';
import { msg, friend} from '../assets'

import { GetFriends } from '../controllers';
import axios from 'axios';

const Friend_Right = ({ profile_id, dm, members }) => {
    const [membersData, setMembersData] = useState([])

    useEffect(() => {
        if (members) {
            axios.get('http://localhost:9000/getMembers/', { params: { members: members } })
                .then((res) => {
                    setMembersData(res.data)
                })
                .catch((err) => {
                    console.error(err)
                })
        }
    }, [dm])

    return (
        <>
            {!dm ? <ProfileBar profile_id={profile_id} /> :
                <div className="rightSideBar">
                    <div className="title shadow" style={{ backgroundColor: "#2b2d31" }}>
                        Members
                    </div>

                    <div className="scroll profilebar">
                        {membersData.map((member, index) => (
                            <div key={index} className="memberBox">
                                <div className="memberpfp">
                                    <img className="pfpInnards" src={'http://localhost:9000/Images/' + member.profile.profile_pic} alt='pfp' />
                                </div>

                                <div className="memberName">{member.username} </div>
                                
                            </div>
                        ))}
                    </div>
                </div>
            }
        </>
    )
}

const FriendsDisplay = ({ setProfile, triggerFriends }) => {
    const [friends, setFriends] = useState([]);
   

    useEffect(() => {
        const fetchData = async () => {
            setFriends(await GetFriends(localStorage.getItem('userID')));
        };

        fetchData();
    }, [triggerFriends]);

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

const Friend_Left = ({ setDm, setMembers, selectedDm, setSelectedDm, toggle }) => {
    const [existingDms, setExistingDms] = useState([]);
    const [createPageVisible, setCreatePageVisible] = useState(false);
    const [friendHubVisible, setfriendHubVisible] = useState(false);
    const [addRender, setAddRender] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:9000/getDirectMessages/', { params: { id: localStorage.getItem('userID') } })
            .then((res) => {
                setExistingDms(res.data);
            })
            .catch((err) => {
                console.error("No DirectMessages found", err);
            });
    }, [addRender]);

    const toggleRender = () => {
        setAddRender(!addRender);
    };

    return (
        <>
            <div className="leftSideBar">
                <div className="l_bar_head shadow">
                    <div className="addDm" onClick={() => { setCreatePageVisible(!createPageVisible) }}>+</div>
                    <div className="msgTitle">Messages</div>
                    <div className="addFriend">
                        <img src={friend} alt='add friend' onClick={()=> setfriendHubVisible(!friendHubVisible)}/>
                    </div>
                </div>

                <div className="l_bar">
                    {existingDms.length > 0 ? existingDms.map((dm, index) => (
                        <div key={index} className={selectedDm === dm.chatroom_id ? "dmBox selected" : "dmBox"}
                            onClick={() => {
                                setDm(dm.chatroom_id);
                                setMembers(dm.members);
                                setSelectedDm(dm.chatroom_id); 
                            }}>

                            <div className="dmName">{dm.title}</div>
                            <img className="dmImg" src={msg} alt='dm'/>
                        </div>
                    ))
                        :
                        <div>No direct messages </div>
                    }
                </div>
            </div>

            {friendHubVisible && <FriendHub set={setfriendHubVisible} toggleFriend={toggle}/>}
            {createPageVisible && <CreateDmPage set={setCreatePageVisible} toggleRender={toggleRender} />}
        </>
    );
}

const Friend_Main = ({ dm_id, setProfile, triggerFriends }) => {
    return (
        <div className='mainContent'>
            {!dm_id ?
                <FriendsDisplay setProfile={setProfile} triggerFriends={triggerFriends} />
                :
                <Messaging group={dm_id} />}
        </div>
    );
}

const Home = ({ selectedDm, setDm, homeClick }) => {
    const [selectedProfile, setSelectedProfile] = useState()
    const [members, setMembers] = useState()
    const [dmHover, setSelectedDm] = useState();
    const [triggerFriends, setTriggerFriends] = useState(false);

    const toggleFriends = () => {
        setTriggerFriends(!triggerFriends)
    }

    useEffect(() => {
        if (!selectedDm) {
            console.log("click")
            setSelectedProfile(localStorage.getItem('userID'))
            setSelectedDm()
            setMembers()
        }
    }, [selectedDm, homeClick])

    return (
        <div className="page">
            <Friend_Left setDm={setDm} setMembers={setMembers} selectedDm={dmHover} setSelectedDm={setSelectedDm} toggle={toggleFriends}/>
            <Friend_Main dm_id={selectedDm} setProfile={setSelectedProfile} triggerFriends={triggerFriends}/>
            <Friend_Right profile_id={selectedProfile} dm={selectedDm} members={members} />
        </div>
    )
}


export default Home;
