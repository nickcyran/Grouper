import axios from 'axios';

const UpdateUsersEvents = async (eventId) => {
    try {
        const response = await axios.post('http://localhost:9000/updateUserEvents', { eventId });
        return response.data;
    } catch (err) {
        console.error('Error in updating user events:', err);
        return [];
    }
};

export {UpdateUsersEvents}