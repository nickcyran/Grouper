import { useState, useEffect, useRef } from "react";
import { GetMessagesFromChat, SendMessageToChat, DeleteMessage } from '../controllers';

import '../styles/chat.css'

const MsgDisplay = ({ chatLog, chatroom }) => {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
    }, [chatLog]);

  
    if (!Array.isArray(chatLog)) {
        return null;
    }

    const handleDelete = (chatroomId, msgId) => {
        console.log()
        DeleteMessage({ chat_id: chatroomId, message_id: msgId })
    };


    return (
        <div className="msgsgs">
            {chatLog.map((chat, index) => {
                const prevChat = index > 0 ? chatLog[index - 1].user_id : null;

                return (
                    <div key={index} className="msgBox">
                        {(prevChat !== chat.user_id) && (
                            <div className="chatProfileBox">
                                <div className="pfp" style={{ width: "60px" }}>
                                    <img className="pfpInnards" src={'http://localhost:9000/Images/' + chat.pfp} alt='pfp' />
                                </div>
                                <b>{chat.username}</b>
                            </div>
                        )}

                        <div className="msg">
                            <div className="messageText">
                                {chat.message}
                            </div>

                            {/* Conditionally render the settings icon */}
                            {localStorage.getItem('userID') === chat.user_id && (
                                <div className="Delete" onClick={() => handleDelete(chatroom, chat._id)}>delete</div>
                            )}
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
                        <MsgDisplay chatLog={chat} chatroom={group} />
                    </div>
                    <MessageBar />
                </div>
            }
        </>
    );
};

export default Messaging;