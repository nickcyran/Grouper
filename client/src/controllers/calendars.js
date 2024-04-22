import axios from 'axios';

const GetCalendars = async (loggedInUser) => {
     console.log('Getting calendars...\n')
     try {
          const response = await axios.get('http://localhost:9000/getcalendars');
          return response.data;
     }
     catch (error) {
          console.log(error);
          return null;
     }
}

const GetTags = async (loggedInUser) => {
     
     try {
          console.log('Trying to get tags...\n')
          const response = await axios.get('http://localhost:9000/getTags');
          return response.data;
     }
     catch (error) {
          console.log(error);
     }
}

export {GetCalendars, GetTags}