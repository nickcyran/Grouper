const express = require('express');
const router = express.Router();

// [CHATROOM(messaging) ROUTES] ------------------------------------------------
const { createChat, getChat, sendChat } = require('./controllers/chatController');
router.post('/createChat', createChat); 
router.get('/getChat', getChat);
router.post('/sendChat', sendChat);

// [USER ROUTES] ---------------------------------------------------------------
const { createUser, getUsername, addToGroup, getGroups } = require('./controllers/userController');
router.post('/createUser', createUser); 
router.post('/addToGroup', addToGroup); 
router.get('/getUsername', getUsername); 
router.get('/getGroups', getGroups); 

// [GROUP ROUTES] ---------------------------------------------------------------
const { createGroup, getTextChannels } = require('./controllers/groupController');
router.post('/createGroup', createGroup); 
router.get('/getTextChannels', getTextChannels); 

module.exports = router; 