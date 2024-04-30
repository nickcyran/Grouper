import '../styles/profilesettings.css';

import { updatePFP } from "../controllers/user";
import { useState, useEffect } from 'react';
import { settings } from '../assets';
import axios from 'axios';

const ProfileBar = ({ profile_id }) => {
    const [pfp, setProfile_Pic] = useState();
    const [username, setUsername] = useState();
    const [name, setName] = useState();
    const [bio, setBio] = useState();
    const [links, setLinks] = useState([]);

    const [ownProfile, setOwnProfile] = useState(false);
    const [forceRender, setForceRender] = useState(false);

    const toggle = () => {
        setForceRender(!forceRender)
    }

    useEffect(() => {
        if (profile_id) {
            setOwnProfile(profile_id === localStorage.getItem('userID'));

            axios.get('http://localhost:9000/getProfile', { params: { _id: profile_id } })
                .then((res) => {
                    setUsername(res.data.username);
                    setProfile_Pic(res.data.pfp);
                    setName(res.data.displayName);
                    setBio(res.data.bio);
                    setLinks(res.data.links);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [profile_id, forceRender]);

    return (
        <div className="rightSideBar">
            <div className="title shadow" style={{ backgroundColor: "#1b2439" }}>
                User Profile
            </div>

            <div className="scroll profilebar">
                {ownProfile && <ProfileOptions profile={{ username, pfp, name, bio, links }} toggle={toggle} />}

                <div className="username">{username}</div>
                <div className="profilePic shadow">
                    <img className="pfpInnards" src={'http://localhost:9000/Images/' + pfp} />
                </div>

                <div className="profileInfo">
                    <span><b>Nickname: </b>{name}</span>
                    <span><b>Biography: </b>{bio}</span>
                    <span><b>Links: </b> <br />
                        {links.map((link, index) => (
                            <><a key={index} href={`https://${link}`} target="_blank" rel="noopener noreferrer">{link}</a> <br /></>
                        ))}
                    </span>
                </div>
            </div>
        </div>
    );
};

const ProfileOptions = ({ toggle }) => {
    const [shown, setShown] = useState(false);
    const [username, setUsername] = useState('');
    const [nickname, setNickname] = useState('');
    const [bio, setBio] = useState('');
    const [links, setLinks] = useState([]);
    const [pfp, setPfp] = useState('');

    const [file, setFile] = useState('')

    useEffect(() => {
        axios.get('http://localhost:9000/getProfile', { params: { _id: localStorage.getItem('userID') } })
            .then((res) => {
                setUsername(res.data.username);
                setPfp(res.data.pfp);
                setNickname(res.data.displayName);
                setBio(res.data.bio);
                setLinks(res.data.links);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const addLink = () => {
        setLinks([...links, '']);
    };

    const handleLinkChange = (index, value) => {
        const newLinks = [...links];
        newLinks[index] = value;
        setLinks(newLinks);
    };

    const removeLink = (index) => {
        const newLinks = [...links];
        newLinks.splice(index, 1);
        setLinks(newLinks);
    };

    const handleProfilePicUpdate = (id) => {
        if (file) {
            const formdata = new FormData();
            formdata.append("file", file);
            formdata.append("_id", id);

            setPfp(updatePFP(formdata, id));
        }
    }

    const handleSubmit = () => {
        const _id = localStorage.getItem('userID');
        handleProfilePicUpdate(_id);

        const profile = {
            display_name: nickname,
            biography: bio,
            links: links
        }

        axios.post('http://localhost:9000/updateUserProfile', { _id, profile }).then((res) => {
            toggle();
            setShown(false)
        })
            .catch((err) => {
                alert("could not update user profile", err)
            })
    }

    return (
        <>
            <div className="settings">
                <img src={settings} alt='profile settings' onClick={() => { setShown(!shown) }} />
            </div>
            {shown &&
                <div className="settingsMenu">
                    <div className="xSettings" onClick={() => setShown(false)}>
                        x
                    </div>
                    <h2 style={{fontSize: "2rem"}}>Profile Settings</h2>

                    <div className="settingsBox">
                        <div className="topWrung">
                            <div className='pfpBasis'>
                                <div className="profilePicSetting">
                                    <img className="pfpInnards" src={'http://localhost:9000/Images/' + pfp} />
                                </div>
                                <input className="fileinput" type="file" onChange={(e) => setFile(e.target.files[0])} />
                            </div>

                            <div className="userNames">
                                <div className="usernameField"><span className="fieldTitle">Username: </span>{username}</div>

                                <div className="field">
                                    <span className="fieldTitle">Nickname:</span>
                                    <input className="inputSettings" type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="bioField">
                            <span className="bio">Bio:</span>
                            <textarea className="bioArea" value={bio} onChange={(e) => setBio(e.target.value)} />
                        </div>

                        <div className="linksField">
                            <span className="bio">Links:</span>
                            <div className="linksContainer">
                                {links.map((link, index) => (
                                    <div key={index} className="linkRow">
                                        <input
                                            type="text"
                                            value={link}
                                            onChange={(e) => handleLinkChange(index, e.target.value)}
                                            placeholder="Enter a link"
                                        />
                                        <button onClick={() => removeLink(index)}>Remove</button>
                                    </div>
                                ))}
                            </div>
                            {links.length >= 5 && (
                                <p className="scrollHint">Scroll for more...</p>
                            )}
                            <button onClick={addLink}>Add Link</button>

                        </div>

                        <div className="submit shadow" onClick={() => handleSubmit()}>
                            submit
                        </div>

                    </div>
                </div>}
        </>
    );
};

export default ProfileBar;