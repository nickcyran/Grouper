import axios from 'axios';

const GetUserGroups = async (id) => {
    try {
        const response = await axios.get('http://localhost:9000/getGroups/', { params: id });
        return response.data;
    } catch (err) {
        console.error('Error in getting Groups:', err);
        return []; 
    }
}; 

const CreateGroup = (body) => {
    axios.post('http://localhost:9000/createGroup/', body)
    .then(res => {
        return res.data;
    })
    .catch((err) => {
        console.error('Error in getting Groups:', err);
    });
}

const GetTextChannels = async (id) => {
    try {
        const response = await axios.get('http://localhost:9000/getTextChannels/', { params: id });
        return response.data;
    } catch (err) {
        console.error('Error in getting text Channel:', err);
        return []; 
    }
}; 

export {GetUserGroups, CreateGroup, GetTextChannels}
