const Event = require('../schemas/eventSchema');
const User = require('../schemas/userSchema');

exports.getTags = async (req, res) => {
    //finds all tags for now
    const events = await Event.find()
    let tagList = []
    for (const event of events) {
        const tags = event.event_tags;
        for (const tag of tags) {
            if (!(tagList.includes(tag)))
                tagList.push(tag)
        }
    }
    res.send(tagList)
}

exports.getcalendars = async (req, res) => {
    /* WHEN LOGIN WORKS 
    const username = req.query.loggedInUser
    const user = await User.findOne({ username })
    const calendarsArray = user.calanders_id
    */

    //find all events for now
    const eventsList = await Event.find({}, { event_name: 1 });

    res.send(eventsList)
}