const express = require('express');
const router = express.Router();

// [CHATROOM(messaging) ROUTES] ------------------------------------------------
const { createChat, getChat, sendChat } = require('./controllers/chatController');
router.post('/createChat', createChat); 
router.get('/getChat', getChat);
router.post('/sendChat', sendChat);

// [USER ROUTES] ---------------------------------------------------------------
const { createUser, getUsername, addToGroup, getGroups, addFriend, getFriends, createDirectMessage, getDirectMessages} = require('./controllers/userController');
router.post('/createUser', createUser); 
router.post('/addToGroup', addToGroup); 
router.post('/addFriend', addFriend); 
router.post('/createDirectMessage', createDirectMessage); 

router.get('/getFriends', getFriends)
router.get('/getUsername', getUsername); 
router.get('/getGroups', getGroups); 
router.get('/getDirectMessages', getDirectMessages);

// [GROUP ROUTES] ---------------------------------------------------------------
const { createGroup, getTextChannels } = require('./controllers/groupController');
router.post('/createGroup', createGroup); 
router.get('/getTextChannels', getTextChannels); 

// [EVENT ROUTES] ---------------------------------------------------------------
const { createEvent, getUsers } = require('./controllers/eventController');
router.post('/createEvent', createEvent);
router.get('/getUsers', getUsers);

// [SERVER ROUTES] --------------------------------------------------------------
const { createServer, getServers, getServerMembership, getServerInvites, getServerMembers, getServerAdmins} = require('./controllers/serverController');
router.post('/createServer', createServer);
router.get('/getServers', getServers);
router.get('/getServerMembership', getServerMembership);
router.get('/getServerInvites', getServerInvites);
router.get('/getServerMembers', getServerMembers);
router.get('/getServerAdmins', getServerAdmins)

module.exports = router; 