import '../styles/Calendar.css';
import React, { Component, useState, useEffect } from 'react'
import 'react-calendar/dist/Calendar.css';
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios'
import {GetTags, GetCalendars} from  "../controllers/calendars.js";


function CalendarGrid() {

     const loggedInUser = localStorage.getItem('loggedInUser');
     const localizer = momentLocalizer(moment)
     const [events, setEvents] = useState([])
     const [tags, setTags] = useState([])

     //manual events for now
     useEffect(() => {
          GetTags()
               .then(res => {
                    setTags((res.data).slice(0))
               })
               .catch(error => {
                    console.log(error)
               })

               GetCalendars()
               .then(res => {
                    const resp = res.slice(0)
                    for (const r in resp) {
                         events.push({
                              start:r.start,
                              end: r.end_date,
                              title: r.event_name
                         })
                    }
                    //setEvents(resp)
                    console.log(resp)
               })
               .catch(error => {
                    console.log(error)
               }) 
        }, []);

     return (
          <div>
               {loggedInUser == null &&
                    <p>Please login.</p>}

               {loggedInUser != null &&
                    <p> {"Welcome " + loggedInUser + "!"}
                    </p>
               }

               <div >
                    <Calendar id="calendar"
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"/>
               </div>
          </div>
     )

}

export default CalendarGrid;