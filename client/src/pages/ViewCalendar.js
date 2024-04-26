import '../styles/Calendar.css';
import Select from 'react-select'
import { React, useState, useEffect } from "react";
import { GetTags, GetCalendars, GetUserEvents } from "../controllers/calendars.js";
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
     const [allEvents, setAllEvents] = useState([])

     /* VIEW SETTING */
     const [viewSetting, setViewSetting] = useState('Monthly')
     const viewArray = ['Daily', 'Weekly', 'Monthly', 'Yearly']

     const viewOptions = viewArray.map((prior) => {
          return { label: prior, value: prior }
     })

     const eventOptions = allEvents.map((eve) => {
          const name = String(eve.event_name)
          return { label: name, value: name }
     }
     )

     // reset view setting
     const handleViewChange = (event) => {
          setViewSetting(event.label);
     }

     useEffect(() => {
          /* GetTags()
                .then(res => {
                     setTags((res.data).slice(0))
                })
                .catch(error => {
                     console.log(error)
                }) */

          GetCalendars(userID)
               .then(res => {
                    if (res.length != 0) {
                         let resp
                         res.map(i => {
                              let resp = res.slice(0)
                              setCalendars(resp)

                              GetUserEvents(resp)
                                   .then(res => {
                                        res.map(j => {
                                             let r = res.slice(0)
                                             setAllEvents(r)
                                        }
                                        )
                                   }
                                   )
                         })
                    }
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
                              userID != null &&
                              calendars.map((cal, index) => {
                                   return (
                                        <label key={index}>
                                             <input
                                                  name={cal.cal_name}
                                                  type="checkbox"
                                                  value={cal.cal_name}
                                             />{cal}<br />
                                        </label>
                                   );
                              })
                         }

                         {userID != null &&
                              <Link to="/newCalendar">Add a calendar</Link>
                         }

                         {userID == null &&
                              <p>Please login to view calendars.</p>}
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

                    <label id="sideheader">Events (for testing)</label><br />
                    <form>
                    {allEvents.length > 0 &&
                              allEvents.map((item, index) => {
                                   return (
                                        <label key={index}>
                                             <li>{item.event_name}</li>
                                        </label>
                                   );
                              })
                         }

                         {allEvents.length <= 0 &&
                              <p>You have no events.</p>
                         }

                    </form>


               </div>

               <div id="calendar-display">
                    {userID == null &&
                         <p>Please login.</p>}

                    {userID != null &&
                         <p> {"Welcome " + userID + "!"}
                         </p> &&
                         <Calendar
                              events={allEvents}
                              localizer={localizer}
                              defaultView='month'
                         />
                    }
               </div>
          </div>
     )
}

export default ViewCalendar;