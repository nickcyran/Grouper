const express = require('express');
const router = express.Router();
const upload = require('./multerMiddleware');

// [CHATROOM(messaging) ROUTES] ------------------------------------------------
const { createChat, getChat, sendChat, deleteMessage, getMembers} = require('./controllers/chatController');
router.post('/createChat', createChat); 
router.get('/getChat', getChat);
router.get('/getMembers', getMembers)
router.post('/sendChat', sendChat);
router.post('/deleteMessage', deleteMessage)

// [USER ROUTES] ---------------------------------------------------------------
const { createUser, getUsername, addToGroup, getGroups, addFriend, getFriends, createDirectMessage, 
        getDirectMessages, getUser, getProfile, updateProfile, updatePFP, sendFriendRequest, getFriendRequests, 
        handleFriendRequest, updateUserProfile, getNotes, setNotes} = require('./controllers/userController');
        
router.post('/createUser', createUser); 
router.post('/addToGroup', addToGroup); 
router.post('/addFriend', addFriend); 
router.post('/createDirectMessage', createDirectMessage); 
router.post('/updateProfile', updateProfile);
router.post('/updatePFP', upload.single("file"), updatePFP);
router.post('/sendFriendRequest', sendFriendRequest)
router.post('/handleFriendRequest', handleFriendRequest)
router.post('/updateUserProfile', updateUserProfile)
router.post('/setNotes', setNotes)

router.get('/getNotes', getNotes);
router.get('/getFriendRequests', getFriendRequests);
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
const { createEvent, getUsers, getEvents, updateUserEvents } = require('./controllers/eventController');
router.post('/createEvent', createEvent);
router.get('/getUsers', getUsers);
router.get('/getEvents', getEvents);
router.post('/updateUserEvents', updateUserEvents);

// [SERVER ROUTES] --------------------------------------------------------------
const { createServer, getServers, getUserServers, getUserServerInvites, getCurrentServer, changeServerName, getServerOwner, getServerMembers, getServerAdmins, addServerAdmins, removeServerAdmins, getServerAdminStatus, sendServerInvite, acceptServerInvite, declineServerInvite, removeServerMembers, getServerChannels, createServerChannels, removeServerChannels, addServerChannels} = require('./controllers/serverController');
router.post('/createServer', createServer);
router.get('/getServers', getServers);
router.get('/getUserServers', getUserServers);
router.get('/getUserServerInvites', getUserServerInvites);
router.get('/getCurrentServer', getCurrentServer);
router.get('/changeServerName', changeServerName);
router.get('/getServerOwner', getServerOwner);
router.get('/getServerMembers', getServerMembers);
router.get('/getServerAdmins', getServerAdmins);
router.get('/addServerAdmins', addServerAdmins);
router.get('/removeServerAdmins', removeServerAdmins);
router.get('/getServerAdminStatus', getServerAdminStatus);
router.get('/sendServerInvite', sendServerInvite);
router.get('/acceptServerInvite', acceptServerInvite);
router.get('/declineServerInvite', declineServerInvite);
router.get('/removeServerMembers', removeServerMembers);
router.get('/getServerChannels', getServerChannels);
router.post('/createServerChannels', createServerChannels);
router.get('/removeServerChannels', removeServerChannels);
router.get('/addServerChannels', addServerChannels);

module.exports = router; 