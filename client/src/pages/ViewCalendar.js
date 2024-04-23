import '../styles/Calendar.css';
import Select from 'react-select'
import { React, useState, useEffect } from "react";
import { GetTags, GetCalendars } from "../controllers/calendars.js";
import "react-calendar/dist/Calendar.css";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { Link } from 'react-router-dom'

function ViewCalendar() {
     /* MEMBERS */
     const [calendars, setCalendars] = useState([]);
     const userID = localStorage.getItem('userID');
     const [tags, setTags] = useState([]);
     const localizer = momentLocalizer(moment)
     const [selectedCalendars, setSelectedCalendars] = useState([])
     const [selectedTags, setSelectedTags] = useState([])
     //temporary events list
     const eventsTemp = [
          {
               allDay: false,
               end: new Date('April 01, 2024 11:31:00'),
               start: new Date('April 02, 2024 11:13:00'),
               title: 'Event1',
          },
          {
               allDay: true,
               end: new Date('April 09, 2023 11:13:00'),
               start: new Date('April 09, 2023 11:13:00'),
               title: 'Event2',
          },
     ];

     /* VIEW SETTING */
     const [viewSetting, setViewSetting] = useState('Monthly')
     const viewArray = ['Daily', 'Weekly', 'Monthly', 'Yearly']

     const viewOptions = viewArray.map((prior) => {
          return { label: prior, value: prior }
     })

     // reset view setting
     const handleViewChange = (event) => {
          setViewSetting(event.label);
     }

     useEffect(() => {
          GetTags()
               .then(res => {
                    setTags((res.data).slice(0))
               })
               .catch(error => {
                    console.log(error)
               })

          GetCalendars(userID)
               .then(res => {
                    const resp = res.slice(0)
                    setCalendars(resp)
               })
               .catch(error => {
                    console.log(error)
               })
     }, [])

     return (
          <div>
               <div id="top">
                    {viewSetting === 'Daily' &&
                         <p id="view">Daily</p>}

                    {viewSetting === 'Weekly' &&
                         <p id="view">Weekly</p>}

                    {viewSetting === 'Monthly' &&
                         <p id="view">Monthly</p>}

                    {viewSetting === 'Yearly' &&
                         <p id="view">Yearly</p>}

                    <Select id="viewselect"
                         onChange={handleViewChange}
                         options={viewOptions}
                         value={viewSetting}
                    />
               </div>

               <div id="side">
                    <label id="sideheader">Calendars</label><br />
                    <form>
                         {calendars.length > 0 &&
                              calendars.map((cal, index) => {
                                   return (
                                        <label key={index}>
                                             <input
                                                  name={cal[2]}
                                                  type="checkbox"
                                                  value={cal._id}
                                             />{cal.event_name}<br />
                                        </label>
                                   );
                              })
                         }

                         {calendars.length === 0 &&

                              <Link to="/newCalendar">Add a calendar</Link>
                         }
                    </form>
                    <br />
                    <label id="sideheader">Tags</label><br />
                    <form>
                         {tags.length > 0 &&
                              tags.map((t, index) => {
                                   return (
                                        <label key={index}>
                                             <input
                                                  name={t}
                                                  type="checkbox"
                                                  value={t}
                                             />{t}<br />
                                        </label>
                                   );
                              })
                         }

                         {tags.length === 0 &&
                              <p>You have no tags.</p>}

                    </form>
               </div>

               <div id="calendar-display">
                    {userID == null &&
                         <p>Please login.</p>}

                    {userID != null &&
                         <p> {"Welcome " + userID + "!"}
                         </p> &&
                         <Calendar
                              events={eventsTemp}
                              localizer={localizer}
                              defaultView='month'
                         />
                    }
               </div>
          </div>
     )
}

export default ViewCalendar;