// import modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const WebSocket = require('ws');

const User = require("./schemas/userSchema");
const Event = require("./schemas/eventSchema");

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
    wss.on('connection', function connection(ws) {
       
    });

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


    app.get('/getTags'), async (req, res) => {
        //not being called? 
        console.log('In index... tags\n')
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
}