import '../styles/Calendar.css';
import '../styles/Event.css';
import { React, useState, useEffect } from "react";
import { GetCalendars, GetUserEvents } from "../controllers/calendars.js";
import NewCalendar from './NewCalendar.js';
import { refresh } from '../assets'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay, startOfDay } from "date-fns"
import Select from 'react-select';
import { GetCalendars1, AddEventToCal } from "../controllers/calendars.js";
import Multiselect from 'multiselect-react-dropdown';
import axios from 'axios';

function VvviewCalendar({ state, set }) {
  /* MEMBERS */
  const userID = localStorage.getItem('userID');
  const [calendars, setCalendars] = useState([]);
  const [allTags, setTags] = useState([]);
  const [selectedCals, setSelectedCals] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tags, setTags1] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [localEvents, setLocalEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  let [allEvents, setAllEvents] = useState([])
  let [selectedCalendars, setSelectedCalendars] = useState([])
  let [selectedTags, setSelectedTags] = useState([])
  let [selectedEvents, setSelectedEvents] = useState([])
  let [render, rerender] = useState(0)

  const [showNewCal, setShowNewCal] = useState(false)

  const [calStyle, setCalStyle] = useState({
    height: "100%",
    width: "100%",
    backgroundColor: '#e3e4e7',
    color: '#2b2d31',
    border: '5px',
  });

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

  const updateSelection = () => {
    rerender(render + 1)
    selectedEvents.length = 0 //clear list
    if (allEvents.length != 0) {

      allEvents.map(eve => {
        (eve.event_tags).map(eventTag => {
          if (selectedTags.includes(eventTag)) {
            selectedEvents.push(eve)
          }
        })
      })
    }

  }
  // get list of users to invite (should be friends with current user at a later date, currently gets all users)
  useEffect(() => {
    axios.get('http://localhost:9000/getFriends', { params: { id: userID } })
      .then((res) => setUsers(res.data))
      .catch((error) => console.error('Error fetching users:', error));

    GetCalendars(userID)
      .then(res => {
        const resp = res.slice(0)
        setCalendars(resp)
      })
      .catch(error => {
        console.log(error)
      })
  }, [userID]);

  // gets all events that user is invited to or is owner of
  useEffect(() => {
    axios.get('http://localhost:9000/getEvents', { params: { userId: userID } })
      .then(response => {
        setLocalEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, [userID]);

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

  // populates dropdown box of users
  const userOptions = users.map(user => ({
    label: `${user.username}`,
    value: user._id
  }));

  // opens create event popup
  const openPopup = () => {
    setIsPopupOpen(true);
    setCalStyle({ ...calStyle, display: 'none' });
  };

  // closes popup as named
  const closePopup = () => {
    setIsPopupOpen(false);
    setTags1([]); // Reset Event Data
    setSelectedUsers([]);
    setCalStyle({ ...calStyle, display: 'block' });
  };

  // does magic on tags
  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  // allows for comma separated list of tags
  const handleAddTag = () => {
    if (tagInput.trim() !== '') {
      setTags1([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  // ability to remove tags easily
  const handleRemoveTag = (indexToRemove) => {
    setTags1(tags.filter((_, index) => index !== indexToRemove));
  };

  //options for calendar
  const calOptions = calendars.map((cal) => {
    return { label: cal, value: cal }
  })

  // checks for valid input and creates event
  const handleCreateEvent = () => {
    const eventName = document.getElementById('eventName').value;
    const eventDescription = document.getElementById('eventDescription').value;
    const startDate = document.getElementById('startDate').value;
    const endDateString = document.getElementById('endDate').value;
    const endDate = new Date(endDateString);
    const currentDate = new Date();
    const eventOwner = userID;

    // does not allow for past dates to be a start/end date
    if (startDate < currentDate || endDate < currentDate) {
      alert('Cannot create event with a start date in the past.');
      return;
    }

    // basically req.body
    const eventData = {
      event_name: eventName,
      event_description: eventDescription,
      event_tags: tags,
      invited_users: selectedUsers.map(user => user.value),
      start_date: new Date(startDate),
      end_date: new Date(endDate),
      date_created: currentDate,
      owner: eventOwner,
    };

    // debug data
    console.log('Event Data:', eventData);

    // create new event
    axios.post('http://localhost:9000/createEvent', eventData)
      .then((res) => {
        const eventId = res.data._id; // Define eventId here
        console.log('Event created successfully:', res.data);

        // adds the event to the owners and invited users calendars
        fetch('http://localhost:9000/updateUserEvents', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ eventId }),
        })
          .then((response) => {
            console.log('User events updated successfully:', response.data);
          })
          .catch((error) => console.error('Error updating user events:', error));

        setLocalEvents([...localEvents, res.data]); // adds new event to local list
        setIsPopupOpen(false); // closes popup
        setTags1([]); // reset tags
        setSelectedUsers([]); // reset selected users
        setCalStyle({ ...calStyle, display: 'block' });

        AddEventToCal(res.data._id, selectedCals) // Add event to specified calendars
          .then(() => console.log('Event successfully added'))
          .catch(error => console.log(error));
      })
      .catch((error) => console.error('Error creating event:', error));

    console.log('New Event Data:', eventData);
    // Update local state with the new event
    setLocalEvents([...localEvents]);
    // Reset form fields and state
    setIsPopupOpen(false);
    setTags1([]);
    setSelectedUsers([]);
  }
  // calculates days until end or start date
  const daysUntilEndDate = (endDate) => {
    const endDateObj = new Date(endDate);

    if (!endDateObj || typeof endDateObj !== 'object' || !endDateObj.getTime) {
      return 0; // Return 0 days if endDate is not a valid Date object
    }
    const currentDate = new Date();
    const differenceInTime = endDateObj.getTime() - currentDate.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    // If the difference is negative it means the event has already started and returns 0
    if (differenceInDays < 0) {
      return 0;
    }
    return differenceInDays;
  };

  // Filter events where userId matches the owner
  const userOwnedEvents = localEvents.filter(event => event.owner === userID);
  // Create options for the dropdown menu
  const eventOptions = userOwnedEvents.map(event => ({
    label: event.event_name,
    value: event._id
  }));

  // Handle change in selected event
  const handleSelectedEventChange = (selectedOption) => {
    const selectedEvent = localEvents.find(event => event._id === selectedOption.value);
    setSelectedEvent(selectedEvent);
    if (selectedEvent) {

      // Populate form with selected event details
      document.getElementById('eventName').value = selectedEvent.event_name;
      document.getElementById('eventDescription').value = selectedEvent.event_description;
      document.getElementById('startDate').value = new Date(selectedEvent.start_date).toISOString().split('T')[0];
      document.getElementById('endDate').value = new Date(selectedEvent.end_date).toISOString().split('T')[0];
      setTags1(selectedEvent.event_tags);
      setSelectedUsers(selectedEvent.invited_users.map((userId) => ({ label: userId, value: userId })));
    }
  };

  // Handle opening the edit popup
  const openEditPopup = () => {
    setIsEditPopupOpen(true);
    setCalStyle({ ...calStyle, display: 'none' });
  };

  // Handle closing the edit popup
  const closeEditPopup = () => {
    setIsEditPopupOpen(false);
    // Reset form fields and state
    setIsPopupOpen(false);
    setTags1([]);
    setSelectedUsers([]);
    setCalStyle({ ...calStyle, display: 'block' });
  };

  var event_id = null;
  const handleEditEvent = () => {
    // Get the selected event from the dropdown
    let eventname = selectedEvent.event_name;
    console.log('selectedEventElement:', eventname);
    axios.get('http://localhost:9000/getEventId', { params: { event_name: eventname } })
      .then(res => {
        const event = res.data; // returns the entire event with matching name
        event_id = event._id; // gets the eventId from event
        console.log('EventId:', event_id);
      })
      .catch((error) => {
        console.error('Error getting eventId:', error);
      });

    if (!selectedEvent) {
      alert('Please select an event to edit.');
      return;
    }
    // Check if the user is the owner of the event
    if (selectedEvent.owner !== userID) {
      alert('You are not the owner of this event and cannot edit it.');
      return;
    }
    // Retrieve updated event data from form fields
    const updatedEventData = {
      event_name: document.getElementById('eventName').value,
      event_description: document.getElementById('eventDescription').value,
      event_tags: tags,
      invited_users: selectedUsers.map(user => user.value),
      start_date: new Date(document.getElementById('startDate').value),
      end_date: new Date(document.getElementById('endDate').value),
      date_created: new Date(),
      owner: userID,
    };
    // create new event
    axios.post('http://localhost:9000/createEvent', updatedEventData)
      .then((res) => {
        console.log('Event created successfully:', res.data);
        // deletes old event
        axios.delete(`http://localhost:9000/deleteEvent/${event_id}`)
          .then((res) => {
            console.log('Event deleted successfully');
            // Update the localEvents state by filtering out the deleted event
            const updatedEvents = localEvents.filter(event => event._id !== event_id);
            setLocalEvents(updatedEvents);
            setIsEditPopupOpen(false);
            setCalStyle({ ...calStyle, display: 'block' });
          })
          .catch(error => {
            console.error('Error updating event:', error);
          });
      }).catch((error) => console.error('Error creating event:', error));
  }
  return (
    <div className="main-container">
      <div id="side">
        <table className="label-button-table">
          <tr>
            <td>
              <div className="sideheader">Calendars</div>
            </td>
            <td>
              <div id="link-container">
                <div className="new-cal" onClick={() => setShowNewCal(!showNewCal)}>+</div>
              </div>
            </td>
            <td>
              <div className="refresh-button-container">
                <img className="refresh-button" id="cal-spacer" src={refresh} alt='refresh page' onClick={() => updateSelection()} />&nbsp; &nbsp;
              </div>
            </td>
          </tr>
        </table>
        <form className="list">
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

          {userID != null && calendars.length == 0 &&
            <p id="warning">Please add a calendar.</p>}

          {userID == null &&
            <p id="warning">Please login to view calendars.</p>}
        </form>



        <table className="label-button-table">
          <tr>
            <td>
              <div className="sideheader">Tags</div>
            </td>
            <td id="spacer"></td>
            <td>
              <div className="refresh-button-container">
                <img className="refresh-button" src={refresh} alt='refresh page' onClick={() => updateSelection()} />&nbsp; &nbsp;
              </div>
            </td>
          </tr>
        </table>
        <form className="list">
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
            <p id="warning">You have no tags.</p>}
        </form>

        <div className="events-container">
          <button onClick={openPopup} className="create-event-button">+ Create Event</button>

          {isEditPopupOpen && (
            <div className="popup-overlay">
              <div className="popup">
                <div className="popup-content">
                  <span className="close" onClick={closeEditPopup}>&times;</span>
                  <h2>Edit Event</h2>


                  <form>
                    <div className="pp">
                      <div className="PopupForm">
                        <div className="form-group">
                          <label htmlFor="selectEvent">Select Event:</label>
                          <div className="black">
                            <Select
                              value={selectedEvent}
                              onChange={handleSelectedEventChange}
                              options={eventOptions}
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label htmlFor="eventName">Event Name:</label>
                          <input type="text" id="eventName" name="eventName" />
                        </div>

                        <div className="form-group">
                          <label htmlFor="eventDescription">Event Description:</label>
                          <textarea id="eventDescription" name="eventDescription" rows="4"></textarea>
                        </div>
                      </div>

                      <div className="PopupForm">
                        <div className="form-group">
                          <label htmlFor="startDate">Start Date:</label>
                          <input type="date" id="startDate" name="startDate" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="endDate">End Date:</label>
                          <input type="date" id="endDate" name="endDate" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="eventTags">Event Tags:</label>
                          <div>
                            <input type="text" value={tagInput} onChange={handleTagInputChange} placeholder="Add tags" />
                            <button type="button" onClick={handleAddTag}>Add</button>
                          </div>
                          <div className="tags">
                            {tags.map((tag, index) => (
                              <span key={index} className="tag">
                                {tag}
                                <button className="mybutton" type="button" onClick={() => handleRemoveTag(index)}>x</button>
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="invitedUsers">Invite Users:</label>
                          <div className="black">
                            <Select
                              isMulti
                              value={selectedUsers}
                              onChange={setSelectedUsers}
                              options={userOptions}
                            />
                          </div>

                        </div>
                      </div>
                    </div>
                    <button type="button" onClick={handleEditEvent}>Update</button>
                  </form>
                </div>
              </div>
            </div>
          )}

          <div className="events-box">
            <h2>Events:</h2>
            <ul>
              {localEvents.map((event) => (
                <li key={event._id}>
                  {event.event_name}:
                  {(() => {
                    // Calculate countdown for start and end dates
                    const daysUntilStart = daysUntilEndDate(event.start_date);
                    const daysUntilEnd = daysUntilEndDate(event.end_date);

                    // Determine if the event has already started
                    const eventHasStarted = daysUntilStart <= 0;

                    // Display countdown based on whether the event has started
                    return eventHasStarted ? ` Ends in ${daysUntilEnd} days` : ` Starts in ${daysUntilStart} days`;
                  })()}
                </li>
              ))}
            </ul>
          </div>

          <button onClick={openEditPopup} className="edit-events-button">Edit My Events</button>

          {/* Popup window */}
          {isPopupOpen && (
            <div className="popup-overlay">
              <div className="popup">
                <div className="popup-content">
                  <span className="close" onClick={closePopup}>&times;</span>
                  <h2>Create Event</h2>
                  <form className="PopupForm">
                    <div className="pp">
                      <div className="PopupSide">
                        <div className="form-group">
                          <label htmlFor="eventName">*Event Name:</label>
                          <input type="text" id="eventName" name="eventName" />
                        </div>

                        <div className="form-group">
                          <label htmlFor="eventDescription">*Event Description:</label>
                          <textarea id="eventDescription" name="eventDescription" rows="4"></textarea>
                        </div>

                        <div className="form-group">
                          <label>Add to Calendar:</label>
                          <div>
                            {userID == null &&
                              <p>Please login to select a calendar.</p>}

                            {userID != null && calendars.length == 0 &&
                              <p>You have no calendars!</p>}

                            {userID != null && calendars.length > 0 &&
                            <div className="black" >
                              <Multiselect
                                options={calOptions}
                                displayValue="label"
                                selected={selectedCals}
                                //add calendars from selected list
                                onSelect={(sel) => {
                                  for (const i in sel) {
                                    if (!(selectedCals.includes(sel[i].label)))
                                      selectedCals.push(sel[i].label)
                                  }
                                }}
                                //remove calendars from selected list
                                onRemove={(sel) => {
                                  selectedCals.length = 0; //clear list
                                  sel.map((i) => {
                                    let ex = (selectedCals.includes(i.label))
                                    if (ex === false) {
                                      selectedCals.push(i.value)
                                    }
                                  })
                                }} />
                                </div>
                            }
                          </div>
                        </div>


                        <div className="tags">
                          {tags.map((tag, index) => (
                            <span key={index} className="tag">
                              {tag}
                              <button type="button" onClick={() => handleRemoveTag(index)}>x</button>
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="PopupSide">
                        <div className="form-group">
                          <label htmlFor="eventTags">Event Tags:</label>
                          <div>
                            <input type="text" value={tagInput} onChange={handleTagInputChange} placeholder="Add tags" />
                            <button type="button" onClick={handleAddTag}>Add</button>
                          </div>
                          <div className="tags">
                            {tags.map((tag, index) => (
                              <span key={index} className="tag">
                                {tag}
                                <button type="button" onClick={() => handleRemoveTag(index)}>x</button>
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="invitedUsers">Invite Users:</label>
                          <div className="black">
                          <Select
                            isMulti
                            value={selectedUsers}
                            onChange={setSelectedUsers}
                            options={userOptions}
                          />
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="startDate">*Start Date:</label>
                          <input type="date" id="startDate" name="startDate" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="endDate">*End Date:</label>
                          <input type="date" id="endDate" name="endDate" />
                        </div>
                      </div>
                    </div>
                    <button className="mybutton" type="button" onClick={() => handleCreateEvent({
                      name: document.getElementById('eventName').value,
                      startDate: new Date(document.getElementById('startDate').value),
                      endDate: new Date(document.getElementById('endDate').value)
                    })}>Create</button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div id="calendar-display">
        {userID != null &&
          <Calendar className="calendar"
            localizer={localizer}
            events={selectedEvents}
            startAccessor={(event) => { return new Date(event.start) }}
            endAccessor={(event) => { return new Date(event.end) }}
            style={calStyle}
          />}
      </div>

      {showNewCal && <NewCalendar set={setShowNewCal} />}
    </div>
  )
}

const ViewCalendar = ({ state, set }) => {
  return (
    <div className="CalBG">
      <div className="NotesX" onClick={() => set(false)}>
        x
      </div>

      <VvviewCalendar />
    </div>
  )
}

export default ViewCalendar;