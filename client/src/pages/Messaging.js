import axios from 'axios';
import { useState, useEffect, useRef } from "react";
import '../styles/chat.css'

const MsgDisplay = ({ chatLog }) => {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
    }, [chatLog]);

    if (!Array.isArray(chatLog)) {
        return null;
    }

    return (
        <div className="msg">
            {chatLog.map((chat) => (
                <div key={chat._id}>
                    <p>
                        {chat.username}:&nbsp; {chat.message}
                    </p>
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
};

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

const GetMessages = (group, setChat) => {
    axios.get('http://localhost:9000/getChat/', { params: { id: group } })
        .then(res => {
            setChat(res.data);
        })
        .catch((err) => {
            console.error('Error in getting chat:', err);
        });
}

const Messaging = ({ group }) => {
    const [chat, setChat] = useState([]);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:9000/change');

        socket.onmessage = (event) => {
            GetMessages(group, setChat)
        }
        return () => {
            socket.close();
        };
    }, [group])

    useEffect(() => {
        GetMessages(group, setChat)
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