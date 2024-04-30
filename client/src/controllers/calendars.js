import axios from 'axios';

const GetCalendars = async (userID) => {
     const response = await axios.get('http://localhost:9000/getCalendars', { params: {userID: userID} } )
     return response.data;
}

const UpdateUserCal = async (userID, newCal) => {
     //create new calendar
     let cal_id = await axios.post('http://localhost:9000/createCalendar', { cal_name: newCal, owner: userID } )
     cal_id = cal_id.data
     
     let resp = await axios.put('http://localhost:9000/updateUserCalendars', { userID: userID, cal_id: cal_id })
     
}

const AddEventToCal = async (event_id, cal_id) => {
     let resp = await axios.put('http://localhost:9000/addEventToCal', { event_id: event_id, cal_id: cal_id })
}

const GetUserEvents = async (calendar) => {
     try {
          let response = await axios.get('http://localhost:9000/getUserEvents', {params: { calendar: calendar}})
          console.log(response.data)
          return response.data
     }
     catch (error) {
          console.log(error)
     }
}

export { AddEventToCal, GetCalendars, UpdateUserCal, GetUserEvents }