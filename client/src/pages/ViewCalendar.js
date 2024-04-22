import '../styles/Calendar.css';
import Select from 'react-select'
import { React, useState, useEffect } from "react";
import CalendarGrid from "./CalendarGrid";
import { GetCalendars, GetTags } from "../controllers/calendars.js";
import axios from 'axios';

function ViewCalendar() {
     /* MEMBERS */
     const [calendars, setCalendars] = useState([]);
     localStorage.setItem('loggedInUser', Object('6625904292fb66306cc22be5'))
     const loggedInUser = localStorage.getItem('loggedInUser');
     const [tags, setTags] = useState([]);

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

     /* CALENDAR SELECTION */
     const [selectedCalendars, setSelectedCalendars] = useState([])

     /* TAGS */
     const [selectedTags, setSelectedTags] = useState([])

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
                    console.log('In ViewCalendar')
                    const resp = res.slice(0)
                    setCalendars(resp)
                    console.log(resp)
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
                              <label>
                                   You have no calendars.
                              </label>}
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

               {<CalendarGrid id="cal" />}

          </div>

     )
}

export default ViewCalendar;