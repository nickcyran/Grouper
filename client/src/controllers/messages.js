import axios from 'axios';

const GetMessagesFromChat = async (group) => {
    try {
        const response = await axios.get('http://localhost:9000/getChat/', { params: { id: group } });
        return response.data;
    } catch (err) {
        console.error('Error in getting Chats:', err);
        return []; 
    }
}; 


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