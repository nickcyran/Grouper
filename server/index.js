// import modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// app
const app = express();

// database
const mongoString = "mongodb+srv://ncyran:jVxcRzyBTgfhhRO3@cluster0.diytgzw.mongodb.net/"; 
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => console.log(error));
database.once('connected', () => console.log('Database Connected')); 

// middleware
app.use(express.json());
app.use(cors());

// routes
const routes = require('./routes');
app.use("/", routes);

// listener
const PORT = 9000;
app.listen(PORT, () => console.log(`Server Started at ${PORT}`))