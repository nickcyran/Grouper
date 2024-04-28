// import modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const WebSocket = require('ws');


const User = require("./schemas/userSchema");
const Event = require("./schemas/eventSchema");
const Calendar = require("./schemas/calendarSchema");

// app
const app = express();

// database
const mongoString = "mongodb+srv://ncyran:jVxcRzyBTgfhhRO3@cluster0.diytgzw.mongodb.net/";
mongoose.connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
        startServer();
    })
    .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// Routes
const routes = require('./routes');
app.use("/", routes);

// Function to start the server
function startServer() {
    // Create a HTTP server
    const server = app.listen(9000, () => console.log('Server started at port 9000'));

    // WebSocket server setup
    const wss = new WebSocket.Server({ server });

    // WebSocket connection handling
    wss.on('connection', function connection(ws) { });

    // Change stream setup after the database connection is established
    const db = mongoose.connection.db;
    const collection = db.collection('chats');
    const changeStream = collection.watch();

    changeStream.on('change', (change) => {
        // Broadcast the change to all WebSocket clients
        wss.clients.forEach(function each(client) {

            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(change));
            }
        });
    });

    app.get('/getCalendars', async (req, res) => {
        const id = req.query.userID
        try {
            const usr = await User.findById(id)
            let calList = []
            for (const cal of usr.calanders_id) {
                const calendar = await Calendar.findById(cal)
                if (calendar != null) {
                    let name = calendar.cal_name
                    calList.push(name)
                }
            }
            res.send(calList)

        }
        catch (error) {
            res.status(500).send(error)
        }
    })

    app.put('/updateUserCalendars', async (req, res) => {

        const cal = req.body.cal_id
        const owner = req.body.userID
        try {
            //find user
            const user = await User.findOne({ _id: owner })
            console.log(user)
            user.calanders_id.push(cal)
            user.save()
            res.send(user)
        }
        catch (error) {
            res.status(500).send(error)
        }
    })

    app.put('/addEventToCal', async (req, res) => {
        const cals = req.body.cal_id
        const event_id = req.body.event_id
        console.log('---------------------------------------------------------------')
        try {
            //find Calendars
            for (i in cals) {
                const calen = cals[i]
                const cldnr = await Calendar.find({ cal_name: calen })
                cldnr[0].events.push(event_id) //will implement unique  calendar names later
                cldnr[0].save()
            }
        }
        catch (error) {
            res.status(500).send(error)
        }
    })


    app.post('/createCalendar', async (req, res) => {
        const name = req.body.cal_name
        const own = req.body.owner
        try {
            const cal = new Calendar(
                {
                    cal_name: name,
                    owner: own,
                    invited_users: [],
                    events: []
                });
            cal.save()
            res.send(cal._id)
        }
        catch (error) {
            res.status(500).send(error)
        }
    })

    app.get('/getUserEvents', async (req, res) => {
        try {
            console.log(req.query)
            let allEvents = []
            const calendar = req.query.calendar
            let calen
            if (Array.isArray(calendar)) { //array
                for (i in calendar) {
                    calen = await Calendar.find({ cal_name: calendar[i] })
                    const calEvents = calen[i].events

                    for (const j in calEvents) { //go through each event in calendar
                        const eve = await Event.find({ _id: calEvents[j] })

                        const name = eve[0].event_name
                        const tags = eve[0].event_tags
                        const start = eve[0].start_date
                        const end = eve[0].end_date

                        allEvents.push({
                            title: name,
                            event_tags: tags,
                            start: start,
                            end: end
                        })
                    }
                }
            }
            else { //string
                
                let calen = await Calendar.find({ cal_name: calendar })
                console.log(calen)
                const calEvents = calen[0].events
                console.log(calEvents)

                for (const j in calEvents) { //go through each event in calendar
                    const eve = await Event.find({ _id: calEvents[j] })

                    const name = eve[0].event_name
                    const tags = eve[0].event_tags
                    const start = eve[0].start_date
                    const end = eve[0].end_date

                    allEvents.push({
                        title: name,
                        event_tags: tags,
                        start: start,
                        end: end
                    })
                }
            }
            res.send(allEvents)
        }
        catch (error) {
            console.log(error)
        }
    })
}

const upload = require('./multerMiddleware');

app.post('/newImage', upload.single("file"), (req, res) => {
    console.log(req.files);
})
