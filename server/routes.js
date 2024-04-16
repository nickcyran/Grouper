const express = require('express');
const router = express.Router();

// [CHATROOM(messaging) ROUTES] ------------------------------------------------
const { createChatroom, getChatroom } = require('../controllers/chatroomController');
router.post('/createChat', createChatroom);
router.get('/getChat', getChatroom);

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

