import axios from 'axios';

const GetMessagesFromChat = (group) => {
    axios.get('http://localhost:9000/getChat/', { params: { id: group } })
        .then(res => {
            return res.data;
        })
        .catch((err) => {
            console.error('Error in getting chat:', err);
        });
}

const SendMessageToChat = (body) => {

    axios.post('http://localhost:9000/sendChat/', body)
    .then(res => {
        console.log("SENT: " + body.message)
    })
    .catch((err) => {
        console.error('Error in sending chat:', err);
    });
}


export {GetMessagesFromChat, SendMessageToChat}