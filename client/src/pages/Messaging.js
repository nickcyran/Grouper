import { useState, useEffect, useRef } from "react";
import { GetMessagesFromChat, SendMessageToChat } from '../controllers';

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
            var group_id = localStorage.getItem('currentGroup');
            var user_id = localStorage.getItem('userID');

            SendMessageToChat({group_id, user_id, message});
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

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:9000/change');

        socket.onmessage = (event) => {
            setChat(GetMessagesFromChat(group));
        }
        return () => {
            socket.close();
        };
    }, [group])

    useEffect(() => {
        setChat(GetMessagesFromChat(group));
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