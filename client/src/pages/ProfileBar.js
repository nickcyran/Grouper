import '../styles/friends.css'

import { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileBar = ({ profile_id }) => {
    const [pfp, setProfile_Pic] = useState();
    const [username, setUsername] = useState();
    const [name, setName] = useState();
    const [bio, setBio] = useState();
    const [link, setLinks] = useState();

    useEffect(() => {
        axios.get('http://localhost:9000/getProfile', { params: { _id: profile_id } })
            .then((res) => {
                setUsername(res.data.username)
                setProfile_Pic(res.data.pfp)
                setName(res.data.displayName)
                setBio(res.data.bio)
                setLinks(res.data.links)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [profile_id])

    return (
        <div className="rightSideBar">
            <div className="title shadow" style={{ backgroundColor: "#2b2d31" }}>
                User Profile
            </div>

            <div className="scroll profilebar">
                <div className="username">{username}</div>
                <div className="profilePic shadow">
                    <img className="pfpInnards" src={'http://localhost:9000/Images/' + pfp} />
                </div>

                <div className="profileInfo">
                    <span><b>Nickname: </b>{name}</span>
                    <span><b>Biography: </b>{bio}</span>
                    <span><b>Links: </b>{link}</span>
                </div>
            </div>
        </div>
    )
}

export default ProfileBar