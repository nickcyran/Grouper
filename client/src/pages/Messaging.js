import { useState, useEffect, useRef } from "react";
import { GetMessagesFromChat, SendMessageToChat, DeleteMessage } from '../controllers';

import '../styles/chat.css'

const Menu = ({ position, onHide, chatUserId, msgId, chatroomId }) => {
    const style = {
        fontSize: "12px",
        position: 'absolute',
        top: position.y,
        left: position.x,
        backgroundColor: "#1e1f22",
        boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.3)',
        borderRadius: '3px',
        padding: '5px',
        zIndex: 9999 
    };

    const handleDelete = () => {
        DeleteMessage({chat_id: chatroomId, message_id: msgId})
        onHide();
    };

    const canDelete = localStorage.getItem('userID') === chatUserId;

    if (!canDelete) {
        return null;
    }

    return (
        <div style={style}>
            {canDelete && (
                <div className="delete" onClick={() => handleDelete()}>Delete</div>
            )}
            {/* Add more options as needed */}
        </div>
    );
};

const MsgDisplay = ({chatLog, chatroom}) => {
    const messagesEndRef = useRef(null);

    const [showMenu, setShowMenu] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [msgSender, setMsgSender] = useState('');
    const [msgId, setMsgId] = useState('');

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
    }, [chatLog]);

    const handleSettingsClick = (e, msgId, chatUserId) => {
        const rect = e.target.getBoundingClientRect();

        setMsgId(msgId)
        setMsgSender(chatUserId)
        setMenuPosition({ x: rect.left, y: rect.bottom });
        setShowMenu(true);
    };

    const hideMenu = () => {
        setShowMenu(false);
    };

    if (!Array.isArray(chatLog)) {
        return null;
    }

    return (
        <div className="msgsgs">
            {chatLog.map((chat, index) => {
                const prevChat = index > 0 ? chatLog[index - 1].user_id : null;

                return (
                    <div key={index} className="msgBox">
                        {(prevChat !== chat.user_id) && (
                            <div className="chatProfileBox">
                                <div className="pfp" style={{width: "60px"}}>
                                    <img className="pfpInnards" src={'http://localhost:9000/Images/' + chat.pfp} alt='pfp'/>
                                </div>
                                <b>{chat.username}</b>
                            </div>
                        )}

                        <div className="msg">
                            <div className="messageText">
                                {chat.message}
                            </div>
                            <div className="settings" onClick={(e) => handleSettingsClick(e, chat._id, chat.user_id)}>...</div>
                        </div>
                    </div>
                );
            })}
            {showMenu && (
                <Menu
                    position={menuPosition}
                    onHide={hideMenu}
                    chatUserId={msgSender}
                    msgId={msgId}
                    chatroomId={chatroom}

                />
            )}
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
                        <MsgDisplay chatLog={chat} chatroom={group}/>
                    </div>
                    <MessageBar />
                </div>
            }
        </>
    );
};

export default Messaging;