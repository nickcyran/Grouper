import axios from "axios";
import '../styles/Calendar.css';
import Select from 'react-select'
import { React, useState, useEffect } from "react";
import CalendarGrid from "./CalendarGrid";

function ViewCalendar() {
     /* MEMBERS */
     const [calendars, setCalendars] = useState([]);
     const loggedInUser = localStorage.getItem('loggedInUser');
     const [tags, setTags] = useState([]);


     useEffect(() => {
          /* WHEN LOGIN WORKS
          if (loggedInUser != null) {
               axios.get('http://localhost:9000/getcalendars',  {params : {loggedInUser}}).then((res) => {
                    setCalendars(res.data);
                    console.log(calendars);
               })
               axios.get('http://localhost:9000/gettags',  {params : {loggedInUser}}).then((res) => {
                    setTags(res.data);
                    console.log(tags);
               })
          } */
          axios.get('http://localhost:9000/getcalendars').then((res) => {
               setCalendars(res.data);
               console.log(calendars);
          })
          axios.get('http://localhost:9000/gettags').then((res) => {
               setTags(res.data);
               console.log(tags);
          })

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
                         {calendars.map((cal, index) => {
                              return (
                                   <label key={index}>
                                        <input
                                             name={cal}
                                             type="checkbox"
                                             value={cal}
                                        />{cal}<br />
                                   </label>
                              );
                         })}
                    </form>
                    <br />
                    <label id="sideheader">Tags</label><br />
                    <form>
                         {tags.map((t, index) => {
                              return (
                                   <label key={index}>
                                        <input
                                             name={t}
                                             type="checkbox"
                                             value={t}
                                        />{t}<br />
                                   </label>
                              );
                         })}
                    </form>
               </div>

               {<CalendarGrid id="cal" />}

          </div>

     )
}

export default ViewCalendar;