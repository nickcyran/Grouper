import React, { useState, useEffect } from 'react';
import '../styles/Event.css';
import axios from 'axios';
import Select from 'react-select';
import { GetCalendars, AddEventToCal } from "../controllers/calendars.js";
import Multiselect from 'multiselect-react-dropdown';

const Events = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [localEvents, setLocalEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [calendars, setCalendars] = useState([]);
  const [selectedCals, setSelectedCals] = useState([]);
  const userID = localStorage.getItem('userID');

  // get list of users to invite (should be friends with current user at a later date, currently gets all users)
  useEffect(() => {
    axios.get('http://localhost:9000/getUsers')
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
  }, []);

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

  // populates dropdown box of users
  const userOptions = users.map(user => ({
    label: `${user.username}`,
    value: user._id
  }));

  // opens create event popup
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  // closes popup as named
  const closePopup = () => {
    setIsPopupOpen(false);
    setTags([]); // Reset Event Data
    setSelectedUsers([]);
  };

  // does magic on tags
  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  // allows for comma separated list of tags
  const handleAddTag = () => {
    if (tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  // ability to remove tags easily
  const handleRemoveTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
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

    axios.post('http://localhost:9000/createEvent', eventData)
    .then((res) => {
      const eventId = res.data._id; // Define eventId here
      console.log('Event created successfully:', res.data);

      // Adds the eventId to the created user's events
      fetch('http://localhost:9000/updateUserEvents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ eventId }),
    })
        .then((response) => {
          console.log('User events updated successfully:', response.data);
          // Update local state or perform any other necessary actions
        })
        .catch((error) => console.error('Error updating user events:', error));
  
      setLocalEvents([...localEvents, res.data]); // adds new event to local list
      setIsPopupOpen(false); // closes popup
      setTags([]); // reset tags
      setSelectedUsers([]); // reset selected users
  
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
  setTags([]);
  setSelectedUsers([]);
  }
  
  // calculates days until end date
  const daysUntilEndDate = (endDate) => {
    const endDateObj = new Date(endDate);

    if (!endDateObj || typeof endDateObj !== 'object' || !endDateObj.getTime) {
      return 0; // Return 0 days if endDate is not a valid Date object
    }

    const currentDate = new Date();
    const differenceInTime = endDateObj.getTime() - currentDate.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

    // If the difference is negative, it means the event has already started, so return 0 days
    if (differenceInDays < 0) {
      return 0;
    }

    return differenceInDays;
  };


  return (
    <div className="events-container">
      {/* Create Event button */}
      <button onClick={openPopup} className="create-event-button">+ Create Event</button>

      {/* Event display list */}
      <div className="events-box">
        <h2>Events:</h2>
        <ul>
          {localEvents.map((event) => (
            <li key={event._id}>
              {event.event_name} : {event.start_date >= new Date() ? `Starts in ${daysUntilEndDate(event.start_date)} days` : `Ends in ${daysUntilEndDate(event.end_date)} days`}
            </li>
          ))}
        </ul>
      </div>

      {/* Popup window */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-content">
              <span className="close" onClick={closePopup}>&times;</span>
              <h2>Create Event</h2>
              <form>
                <div className="form-group">
                  <label htmlFor="eventName">Event Name:</label>
                  <input type="text" id="eventName" name="eventName" />
                </div>
                <div className="form-group">
                  <label htmlFor="eventDescription">Event Description:</label>
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
                    }
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
                  <Select
                    isMulti
                    value={selectedUsers}
                    onChange={setSelectedUsers}
                    options={userOptions}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="startDate">Start Date:</label>
                  <input type="date" id="startDate" name="startDate" />
                </div>
                <div className="form-group">
                  <label htmlFor="endDate">End Date:</label>
                  <input type="date" id="endDate" name="endDate" />
                </div>
                <button type="button" onClick={() => handleCreateEvent({
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
  );
};

export default Events;
