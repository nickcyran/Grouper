import '../styles/Calendar.css';
import Select from 'react-select'
import { React, useState, useEffect } from "react";
import { GetTags, GetCalendars, GetUserEvents } from "../controllers/calendars.js";
import { Link } from 'react-router-dom'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay, startOfDay } from "date-fns"
import DatePicker from "react-datepicker"

function ViewCalendar() {
     /* MEMBERS */
     const userID = localStorage.getItem('userID');
     const [calendars, setCalendars] = useState([]);
     const [tags, setTags] = useState([]);
     const [allEvents, setAllEvents] = useState([])
     let [selectedCalendars, setSelectedCalendars] = useState([])
     let [selectedTags, setSelectedTags] = useState([])
     let [selectedEvents, setSelectedEvents] = useState([])
     const locales = {
          "en-US": require("date-fns/locale/en-US")
     }
     const localizer = dateFnsLocalizer({
          format,
          parse,
          startOfWeek,
          getDay,
          locales
     })

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
                                             <li>{item.title}</li>
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
                         <div id="calendar-display">
                              <Calendar
                                   localizer={localizer}
                                   events={allEvents}
                                   startAccessor={(event) => { return new Date(event.start) }}
                                   endAccessor={(event) => { return new Date(event.end) }}
                                   style={{ height: 700 }}
                              />
                         </div>

                    }
               </div>
          </div>
     )
}

export default ViewCalendar;