import axios from "axios";
import '../styles/Calendar.css';
import Select from 'react-select'
import { React, useState } from "react";
import Multiselect from 'multiselect-react-dropdown';

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
     const [calendarNum, setNum] = useState(0)

     const calendarOptions = calendars.map((cal) => {
          return { label: cal, value: cal }
     })

     //use effect to get calendars

     /* TAGS */

     return (
          <div>
               <label>View Setting</label>
               <Select id="select"
                    onChange={handleViewChange}
                    options={viewOptions}
                    value={viewSetting}
               />

               <p></p>

               <label>Calendars</label>
               <Multiselect id="select"
                    options={calendarOptions}
                    displayValue="label"
                    value={selectedCalendars}
                    onSelect={(e) => {
                         e.map((u) => {
                              let ex = (selectedCalendars.includes(u.value))
                              if (ex === false) {
                                   selectedCalendars.push(u.value)
                              }
                              return null
                         })
                    }}
                    onRemove={(e) => {
                         selectedCalendars.length = 0; //clear selectedCalendars
                         e.map((u) => {
                              let ex = (selectedCalendars.includes(u.value))
                              if (ex === false) {
                                   selectedCalendars.push(u.value)
                              }
                              return null
                         })
                    }
                    }

               />

               <p></p>


               {/*DISPLAY */}
               {viewSetting === 'Daily' &&
                    <p>You are now viewing daily.</p>}

               {viewSetting === 'Weekly' &&
                    <p>You are now viewing weekly.</p>}

               {viewSetting === 'Monthly' &&
                    <p>You are now viewing monthly.</p>}

               {viewSetting === 'Yearly' &&
                    <p>You are now viewing yearly.</p>}

               {(selectedCalendars.length) === 0 &&
                    <p>Please select at least one calendar to view.</p>}
               
          </div>
     )
}

export default ViewCalendar;