import '../styles/friendHub.css'
import { useState, useEffect } from 'react';
import axios from 'axios';

const InviteCard = (user, key) => {
    return (
        <div key={key} className="inviteCard">
            d
        </div>
    )
}

const FriendHub = ({ set }) => {
    const [username, setUsername] = useState('')
    const [invites, setInvites] = useState([])

    useEffect(() => {
        axios.get('http://localhost:9000/getFriendRequests/', { params: { id: localStorage.getItem('userID') } })
            .then((res) => {
                setInvites(res.data)
            })
            .catch((err) => {
                console.error("no friend invites")
            });
    }, [])

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
                            <InviteCard user={user} key={key} />
                            
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FriendHub