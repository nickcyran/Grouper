import axios from 'axios';

const GetCalendars = async (loggedInUser) => {
     const response = await axios.get('http://localhost:9000/getCalendars')
     return response.data;
}

const GetTags = async (loggedInUser) => {
     const response = await axios.get('http://localhost:9000/getTags')
     return response;
}

export { GetCalendars, GetTags }