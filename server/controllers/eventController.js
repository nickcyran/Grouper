const Event = require('../schemas/eventSchema');
const User = require('../schemas/userSchema');

exports.createEvent = async (req, res) => {
  try {
      // debug html request
      console.log('Request body:', req.body);

      const { event_name, event_description, event_tags, invited_users, start_date, end_date, date_created } = req.body;
      const userId = req.body.userId;

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
          owner: userId,
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
      // get userID
      // idk if this works
      const userId = req.params.userId;
  
      // get Events that belong to the User
      const events = await Event.find({
        $or: [
          { owner: userId }, // user is the owner
          { invited_users: userId } // user is in the invited_users list
        ]
      });
      res.json(events);
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ error: 'Internal server error' });
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