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


     useEffect(() => {

          //setCalendars(GetCalendars(loggedInUser))
          //console.log(calendars.length)

          axios.get('http://localhost:9000/getTags')
               .then(async (res) => {
                    const events = await Event.find()
                    let tagList = []
                    for (const event of events) {
                         const tags = event.event_tags;
                         for (const tag of tags) {
                              if (!(tagList.includes(tag)))
                                   tagList.push(tag)
                         }
                    }
                    console.log(tagList)
                    res.send(tagList)
               })
               .catch((err) => alert('Error'))
          //setTags(GetTags(loggedInUser))
          //console.log(tags.length)

     }, [])


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
                                                  name={cal}
                                                  type="checkbox"
                                                  value={cal}
                                             />{cal}<br />
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