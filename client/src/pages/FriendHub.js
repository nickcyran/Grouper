import '../styles/friendHub.css'
import { useState, useEffect } from 'react';
import {accept, decline} from '../assets'
import axios from 'axios';

const InviteCard = ({user, toggle}) => {

    const handleRequest = (bool) => {
        axios.post('http://localhost:9000/handleFriendRequest/', {id: localStorage.getItem('userID'), theirId: user._id, accepted: bool})
        .then((res) => {
            alert(res.data)
            toggle();
        })
        .catch((err) => {
            console.error("no friend invites")
        });
    }

    return (
        <div  className="inviteCard">
            <div className="FriendPFP">
                <div className="pfp">
                    <img className="pfpInnards" src={'http://localhost:9000/Images/' + user.profile.profile_pic} alt='pfp' />
                </div>
            </div>

            <div className="FriendName">
                {user.username}
            </div>

            <div className="InviteOptions">
                <div className="FriendOption">
                    <img src={accept} alt='accept invite' onClick={() => handleRequest(true)}/>
                </div>

                <div className="FriendOption">
                    <img src={decline} alt='decline invite' onClick={() => handleRequest(false)}/>
                </div>
                
            </div>
           
        </div>
    )
}

const FriendHub = ({ set, toggleFriend }) => {
    const [username, setUsername] = useState('')
    const [invites, setInvites] = useState([])
    const [trigger, setTrigger] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:9000/getFriendRequests/', { params: { id: localStorage.getItem('userID') } })
            .then((res) => {
                setInvites(res.data)
            })
            .catch((err) => {
                console.error("no friend invites")
            });
    }, [trigger])

    const toggle = () => {
        toggleFriend();
        setTrigger(!trigger);
    }

    const handleSubmit = () => {
        if (!(/^\s*$/.test(username))) {
            axios.post('http://localhost:9000/sendFriendRequest/', { id: localStorage.getItem('userID'), username: username })
                .then((res) => {
                    alert(res.data)
                })
                .catch((err) => {
                    alert(err.response.data)
                });

            set(false)
            console.log(username)
            setUsername('')
        }
    }

    return (
        <div className="FriendHub">
            <div className="innerForm">
                <div className="x" onClick={() => set(false)}>
                    x
                </div>
                <h2>Friend Hub</h2>

                <div>
                    <div className="formtitle">Add Friend:</div>
                    <div style={{ position: 'relative' }}>
                        <input
                            className="input"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            required
                        />
                        <div className="SendInvite shadow" onClick={handleSubmit}>
                            Send
                        </div>
                    </div>
                </div>

                <div>
                    <div className="formtitle">Pending Invites:</div>
                    <div className="friendInvites">
                        {invites.map((user, key) => (
                            <InviteCard user={user} key={key} toggle={toggle}/>
                            
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FriendHub