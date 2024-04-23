const express = require('express');
const router = express.Router();

// [CHATROOM(messaging) ROUTES] ------------------------------------------------
const { createChat, getChat, sendChat, deleteMessage } = require('./controllers/chatController');
router.post('/createChat', createChat); 
router.get('/getChat', getChat);
router.post('/sendChat', sendChat);
router.post('/deleteMessage', deleteMessage)

// [USER ROUTES] ---------------------------------------------------------------
const { createUser, getUsername, addToGroup, getGroups, addFriend, getFriends, createDirectMessage, getDirectMessages, getUser, getProfile, updateProfile} = require('./controllers/userController');
router.post('/createUser', createUser); 
router.post('/addToGroup', addToGroup); 
router.post('/addFriend', addFriend); 
router.post('/createDirectMessage', createDirectMessage); 
router.post('/updateProfile', updateProfile);

router.get('/getProfile', getProfile);
router.get('/getUser', getUser);
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
const { createServer, getServers, getServerMembership, getServerInvites, getServerMembers, getServerAdmins, sendServerInvite, getServerChannels, createServerChannels} = require('./controllers/serverController');
router.post('/createServer', createServer);
router.get('/getServers', getServers);
router.get('/getServerMembership', getServerMembership);
router.get('/getServerInvites', getServerInvites);
router.get('/getServerMembers', getServerMembers);
router.get('/getServerAdmins', getServerAdmins);
// router.get('/sendServerInvite', sendServerInvite);
// router.get('/getServerChannels', getServerChannels);
// router.get('/createServerChannels', createServerChannels);

module.exports = router; 