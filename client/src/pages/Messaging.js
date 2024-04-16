import axios from 'axios';
import { useState } from "react";
import '../styles/chat.css'

function createChat() {
    // var chat = {
    //     members: ['661eeadeca5795c82406e572', '661eeb1069a36e5ec66a82a8'],
    //     messages: [{
    //         user_id: '661eeb1069a36e5ec66a82a8',
    //         message: "hello"
    //     },
    //     {
    //         user_id: '661eeadeca5795c82406e572',
    //         message: "goodbye"},
    // ]
    // }

    // console.log(chat)
    // axios.post('http://localhost:9000/createChat', chat)
    //     .then((res) => {
    //         console.log("created" + chat)
    //     })
    //     .catch((err) => {
    //         console.error('Error in chat creation', err);
    //         alert('Error in chat creation');
    //     });
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