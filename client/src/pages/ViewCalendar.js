import axios from "axios";
import '../styles/Calendar.css';
import Select from 'react-select'
import { React, useState } from "react";
import CalendarGrid from "./CalendarGrid";

function ViewCalendar() {
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
     //const [calendars, setCalendars] = useState([]);
     const calendars = ['Personal Calendar', 'Work Calendar', 'Family Calendar'];
     const [selectedCalendars, setSelectedCalendars] = useState([])
     //use effect to get calendars from database

     /* TAGS */
     const tags = ['High Priority', 'Medium Priority', 'Low Priority'];
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
                    <br/>
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

           {<CalendarGrid id="cal"/>} 

          </div>
          
     )
}

export default ViewCalendar;