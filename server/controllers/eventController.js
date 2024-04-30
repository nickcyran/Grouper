const Event = require('../schemas/eventSchema');
const User = require('../schemas/userSchema');

exports.createEvent = async (req, res) => {
  try {
      // debug html request
      console.log('Request body:', req.body);

      const { event_name, event_description, event_tags, invited_users, start_date, end_date, date_created , owner} = req.body;

      if (!event_name || !event_description || !start_date || !end_date) {
          return res.status(400).send("Missing required fields.");
      }

      const event = new Event({
          event_name,
          event_description,
          event_tags: event_tags || [],
          invited_users: invited_users || [],
          start_date,
          end_date,
          date_created,
          owner,
      });

      await event.save();
      // debug html request
      console.log('Event created:', event);

      res.status(201).send(event);
  } catch (error) {
      console.error('Error creating event:', error);
      res.status(500).send("An unexpected error occurred.");
  }
};

exports.getEvents = async (req, res) => {
  try {
      // Delete events in the past
      await deleteExpiredEvents();

      const userId = req.query.userId;

      if (!userId) {
          return res.status(400).json({ error: 'User ID is required' });
      }

      // Initialize an array to store the matching events
      const matchingEvents = [];

      // Find events where the user is either the owner or invited user
      const events = await Event.find({
          $or: [
              { owner: userId }, // User is the owner
              { invited_users: userId } // User is in the invited_users list
          ]
      });

      // Iterate over the events and add them to the matchingEvents array
      events.forEach(event => {
          matchingEvents.push({
              _id: event._id,
              event_name: event.event_name,
              event_description: event.event_description,
              event_tags: event.event_tags,
              invited_users: event.invited_users,
              start_date: event.start_date,
              end_date: event.end_date,
              date_created: event.date_created,
              owner: event.owner
          });
      });

      // Return the matching events
      res.json(matchingEvents);
  } catch (error) {
      console.error('Error fetching events:', req.query.userId);
      res.status(500).json({ error: 'Internal server error' });
  }
};

  const deleteExpiredEvents = async () => {
    try {
      // Get the current date
      const currentDate = new Date();
  
      // Find events with end dates in the past
      const expiredEvents = await Event.find({ end_date: { $lt: currentDate } });
  
      // Delete each expired event
      for (const event of expiredEvents) {
        await Event.findByIdAndDelete(event._id);
      }
  
      console.log(`${expiredEvents.length} expired events deleted.`);
    } catch (error) {
      console.error('Error deleting expired events:', error);
    }
  };

  // used to get list of ALL users (bad)
exports.getUsers = async (req, res) => {
    try {
        const userList = await User.find({}, {username:1});
        res.send(userList)
    }
    catch (error) {
        res.status(500).send(error)
    }
}

// Define the route handler for updating user events
exports.updateUserEvents = async (req, res) => {
  try {
    // Extract eventId from the request body
    const { eventId } = req.body;

    // Find the event in the database
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).send('Event not found');
    }

    // Extract invited_users from the event object
    const invitedUsers = event.invited_users;

    // Debug line to print the IDs of the invited users
    console.log('Invited Users:', invitedUsers);
    
    // Iterate over invitedUsers and update their events
    for (const userId of invitedUsers) {
      // Find the user in the database
      const user = await User.findById(userId);
      if (user) {
        // Add the eventId to the user's events array
        user.events.push(eventId);
        // Save the updated user object
        await user.save();
      }
    }

    // Return a success response
    res.status(200).send('User events updated successfully');
  } catch (error) {
    console.error('Error updating user events:', error);
    res.status(500).send('An unexpected error occurred');
  }
};