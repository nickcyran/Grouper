import axios from 'axios';
import { useState } from "react";

const GetCalendars = async (loggedInUser) => {
     const response = await axios.get('http://localhost:9000/getCalendars')
     return response.data;
}

const GetTags = async (loggedInUser) => {
     const response = await axios.get('http://localhost:9000/getTags')
     return response;
}

const UpdateUserCal = async (loggedInUser, newCal, desc) => {
     //make new calendar first
     let cal_id;
     axios.post('http://localhost:9000/createCalendar',{ params: { cal_name: newCal, owner: loggedInUser } } )
          .then((res) => {
               cal_id = (res.data) //get calendar ID
               console.log(cal_id)
          })
          .catch((err) => {
               console.log("Error making new calendar.")
               console.log(err)
          })

     /*add to user profile
     try {
          const response = await axios.post('http://localhost:9000/updateusercalendars', { loggedInUser, cal_id })
     }
     catch {
          console.log('Error updating user\'s calendars')
     } */

     return 1;
}

export { GetCalendars, GetTags, UpdateUserCal }