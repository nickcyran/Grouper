import React, { useState, useEffect } from 'react';
import '../styles/Event.css';
import axios from 'axios';
import Select from 'react-select';

const Events = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [localEvents, setLocalEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  // get list of users to invite (should be friends with current user at a later date, currently gets all users)
  useEffect(() => {
    axios.get('http://localhost:9000/getUsers')
      .then((res) => setUsers(res.data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  // // gets all events that user is invited to or is owner of
  // useEffect(() => {
  //   axios.get('http://localhost:9000/getEvents')
  //     .then(response => {
  //       setLocalEvents(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching events:', error);
  //     });
  // }, []);

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

  // checks for valid input and creates event
  const handleCreateEvent = () => {

    const eventName = document.getElementById('eventName').value;
    const eventDescription = document.getElementById('eventDescription').value;
    const startDate = document.getElementById('startDate').value;
    const endDateString = document.getElementById('endDate').value;
    const endDate = new Date(endDateString);
    const currentDate = new Date();

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
    };

    // debug data
    console.log('Event Data:', eventData);

    axios.post('http://localhost:9000/createEvent', eventData)
    .then((res) => {
      console.log('Event created successfully:', res.data);
      setLocalEvents([...localEvents, res.data]); // adds new event to local list
      setIsPopupOpen(false); // closes popup
      setTags([]); // reset tags
      setSelectedUsers([]);
    })
    .catch((error) => console.error('Error creating event:', error));

    console.log('New Event Data:', eventData);
  
    // Update local state with the new event
    setLocalEvents([...localEvents]);
  
    // Reset form fields and state
    setIsPopupOpen(false);
    setTags([]);
    setSelectedUsers([]);
  };

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
