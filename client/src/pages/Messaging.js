import axios from 'axios';
import { useState } from "react";
import '../styles/chat.css'

const axiosLogic = (msg) => {
    function createChat() {
        // var chat = {
        //     members: [_id],
        //     messages: 
        //     [{
        //         user_id: _id,
        //         message: String
        //     }]
        // }

        // get the id of current chatroom from local storage
    }    
}

const Messaging = () => {
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault()
    
        if (!(/^\s*$/.test(message))) {
            //AXIOS LOGIC HERE
            setMessage('')
        }
    }
    
    return (
        <>
            <h1>grouper!</h1>
            <form onSubmit={handleSubmit}>
                <input
                    className="msgBar"
                    type="text" name="message" placeholder="enter your message here"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit">
                    Send
                </button>
            </form>
        </>
    )
};

export default Messaging;