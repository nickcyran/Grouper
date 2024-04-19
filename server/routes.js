const express = require('express');
const router = express.Router();

// [CHATROOM(messaging) ROUTES] ------------------------------------------------
const { createChat, getChat, sendChat } = require('./controllers/chatController');
router.post('/createChat', createChat); 
router.get('/getChat', getChat);
router.post('/sendChat', sendChat);

// [USER ROUTES] ---------------------------------------------------------------
const { createUser, getUsername } = require('./controllers/userController');
router.post('/createUser', createUser); 
router.get('/getUsername', getUsername); 


// --ADD ROUTES HERE---
// EX SMTHING LIKE THIS)

//---USER ROUTES---

//const { getUser, getUsers, getUserByID, postUser } = require('../controllers/userController');
    //router.get('/getUser', getUser);
    //router.get('/getUsers', getUsers);
    //router.get('/getUserByID', getUserByID);
    //router.post('/createUser', postUser);

// ---PROJECT ROUTES---

//const { getProjects, postProject } = require('../controllers/projectController')
    //router.get('/getProjects', getProjects);
    //router.post('/createProject', postProject);

module.exports = router; 