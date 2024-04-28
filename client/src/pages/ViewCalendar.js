import '../styles/Calendar.css';
import Select from 'react-select'
import { React, useState, useEffect } from "react";
import { GetCalendars, GetUserEvents } from "../controllers/calendars.js";
import { Link } from 'react-router-dom'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay, startOfDay } from "date-fns"
import DatePicker from "react-datepicker"

function ViewCalendar() {
     /* MEMBERS */
     const userID = localStorage.getItem('userID');
     const [calendars, setCalendars] = useState([]);
     const [allTags, setTags] = useState([]);
     let [allEvents, setAllEvents] = useState([])
     let [selectedCalendars, setSelectedCalendars] = useState([])
     let [selectedTags, setSelectedTags] = useState([])
     let [selectedEvents, setSelectedEvents] = useState([])
     let [render, rerender] = useState(0)
     let useEffectCount = 0
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

     const updateSelection = async () => {
          rerender(render + 1)
          selectedEvents.length = 0 //clear list
          allEvents.map(eve => {
               (eve.event_tags).map(eventTag => {
                    if (selectedTags.includes(eventTag)) {
                         selectedEvents.push(eve)
                    } 
               })
          })
     }


     useEffect(() => {
          if (useEffectCount == 0) { //useeffect runs twice since app is rendered using strictmode. use a counter variable as a workaround
               //get user calendars first, then continue to events and tags
               GetCalendars(userID)
                    .then(res => {
                         if (res.length != 0) {
                              let resp = res.slice(0)
                              setCalendars(resp)
                              setSelectedCalendars(resp)

                              resp.map(j => { //each calendar
                                   GetUserEvents(j) //gets events for each calendar
                                        .then(res => {
                                             let r = res.slice()
                                             //go through each event and get tags
                                             for (const k in r) {
                                                  if (!(selectedEvents.includes(r[k]))) {
                                                       selectedEvents.push(r[k])
                                                  }
                                                  if (!(allEvents.includes(r[k]))) {
                                                       allEvents.push(r[k])
                                                  }


                                                  //get tags
                                                  const tagsList = r[k].event_tags

                                                  for (const l in tagsList) {
                                                       const t = tagsList[l]
                                                       if (!(allTags.includes(t))) {
                                                            allTags.push(t)
                                                            selectedTags.push(t)
                                                       }
                                                  }
                                             }
                                        }
                                        )
                              })

                         }
                    })
                    .catch(error => {
                         console.log(error)
                    })
               useEffectCount = 1
          }
     }, [])

     return (
          <div>
               <div id="side">
                    <label id="sideheader">Calendars</label>
                    <div id="side-button">
                         <button id="refresh-button" onClick={updateSelection}>&#8634;</button>
                    </div>
                    <br />
                    <form>
                         {calendars.length > 0 &&
                              userID != null &&
                              calendars.map((cal, index) => {
                                   return (
                                        <label key={index}>
                                             <input
                                                  defaultChecked={true}
                                                  onChange={(event) => {
                                                       if (event.target.checked) {
                                                            if (!(selectedCalendars.includes(event.target.value)))
                                                                 selectedCalendars.push(event.target.value)
                                                       }
                                                       else {
                                                            console.log('removing ' + event.target.value)
                                                            console.log(selectedCalendars)
                                                            const index = selectedCalendars.indexOf(event.target.value)
                                                            const array1 = selectedCalendars.splice(0, index)
                                                            const array2 = selectedCalendars.splice(index, (selectedCalendars.length - 1))
                                                            setSelectedCalendars = [] //clear list
                                                            for (const i in array1) {
                                                                 selectedCalendars.push(array1[i])
                                                            }
                                                            for (const i in array2) {
                                                                 selectedCalendars.push(array2[i])
                                                            }
                                                            console.log('done')
                                                            console.log(selectedCalendars)
                                                       }
                                                       updateSelection()
                                                  }}
                                                  name={cal}
                                                  type="checkbox"
                                                  value={cal}
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
                         {allTags.length != 0 &&
                              allTags.map((t, index) => {
                                   return (
                                        <label key={index}>
                                             <input
                                                  defaultChecked={true}
                                                  //add tags from selected list
                                                  onChange={(event) => {
                                                       if (event.target.checked) {
                                                            if (!(selectedTags.includes(event.target.name)))
                                                                 selectedTags.push(event.target.name)
                                                       }
                                                       else {
                                                            const index = selectedTags.indexOf(event.target.name)
                                                            const array1 = selectedTags.splice(0, index)
                                                            const array2 = selectedTags.splice(index, (selectedTags.length - 1))
                                                            selectedTags.length = 0; //clear list
                                                            for (const i in array1) {
                                                                 selectedTags.push(array1[i])
                                                            }
                                                            for (const i in array2) {
                                                                 selectedTags.push(array2[i])
                                                            }
                                                       }
                                                       updateSelection()
                                                  }}
                                                  name={t}
                                                  type="checkbox"
                                                  value={t}
                                             />{t}<br />
                                        </label>
                                   );
                              })
                         }

                         {allTags.length === 0 &&
                              <p>You have no tags.</p>}
                    </form>
               </div>

               <div id="calendar-display">
                    {userID == null &&
                         <p>Please login.</p>}

                    {userID != null &&
                         <div >
                              <Calendar
                                   localizer={localizer}
                                   events={selectedEvents}
                                   startAccessor={(event) => { return new Date(event.start) }}
                                   endAccessor={(event) => { return new Date(event.end) }}
                                   style={{ height: 700, backgroundColor: 'gray' }}
                              />
                         </div>
                    }
               </div>
          </div>
     )
}

export default ViewCalendar;