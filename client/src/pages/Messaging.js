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
        <div className="msgsgs">
            {chatLog.map((chat, index) => {
                return (
                    <div key={index} className="msgBox">
                        <div className="dmPfp" />
                        <div className="msg">
                            <b>{chat.username}:</b>&nbsp; {chat.message}
                        </div>
                    </div>
                );
            })}
            <div ref={messagesEndRef} />
        </div>
    );
};

const Messaging = ({ group }) => {
    const [chat, setChat] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setChat(await GetMessagesFromChat(group));
        };

        const socket = new WebSocket('ws://localhost:9000/change');

        socket.onmessage = (event) => {
            fetchData();
        };

        // Initial fetch
        fetchData();

        return () => {
            socket.close();
        };
    }, [group]);

    const MessageBar = () => {
        const [message, setMessage] = useState('');

        const handleSubmit = (event) => {
            event.preventDefault();

            if (!(/^\s*$/.test(message))) {
                var user_id = localStorage.getItem('userID');
                SendMessageToChat({ group_id: group, user_id, message });
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

    return (
        <>
            {group &&
                <div className="msgContainer">
                    <div className="pastChats">
                        <MsgDisplay chatLog={chat} />
                    </div>
                    <MessageBar />
                </div>
            }
        </>
    );
};

export default Messaging;