import axios from 'axios';
import { useState, useEffect } from "react";
import '../styles/chat.css'

const MsgDisplay = ({ chatLog }) => {
    const [usernames, setUsernames] = useState('');

    useEffect(() => {
        const fetchUsernames = async () => {
            const usernames = {};
            for (const chat of chatLog) {
                try {
                    const res = await axios.get('http://localhost:9000/getUsername/', { params: { id: chat.user_id } });
                    usernames[chat.user_id] = res.data;
                } catch (err) {
                    console.error('Error in getting username:', err);
                    alert('Error in getting username');
                }
            }
            setUsernames(usernames);
        };

        if (Array.isArray(chatLog)) {
            fetchUsernames();
        }
    }, [chatLog]);

    if (!Array.isArray(chatLog)) {
        return null;
    }

    return (
        <div className="msg">
            {chatLog.map((chat, index) => (
                <div key={index}>
                    <p>{usernames[chat.user_id]}:&nbsp; {chat.message}</p>
                </div>
            ))}
        </div>
    )
}

const MessageBar = () => {
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!(/^\s*$/.test(message))) {
            var groupID = localStorage.getItem('currentGroup');
            var userID = localStorage.getItem('userID');

            axios.post('http://localhost:9000/sendChat/', { group_id: groupID, user_id: userID, message: message })
                .then(res => {
                    console.log("SENT: " + message)
                })
                .catch((err) => {
                    console.error('Error in sending chat:', err);
                });
            setMessage('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                className="msgBar"
                autoComplete="off"
                type="text"
                name="message"
                placeholder="Enter your message here"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button className="submit" type="submit">Send</button>
        </form>
    )
}

const Messaging = ({ group }) => {
    const [chat, setChat] = useState([]);

    console.log(group)

    useEffect(() => {
        axios.get('http://localhost:9000/getChat/', { params: { groupId: group } })
            .then(res => {
                setChat(res.data.messages);
            })
            .catch((err) => {
                console.error('Error in getting chat:', err);
                alert('Error in getting chat');
            });
    }, [group]);

    return (
        <div className="msgContainer">

            <div className="pastChats">
                <MsgDisplay chatLog={chat} />
            </div>

            <MessageBar />
        </div>
    );
};

export default Messaging;