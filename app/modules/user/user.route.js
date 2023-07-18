require('dotenv').config();
const express = require('express');
const createUser = require('./create.controller');
const getAUser = require('./get.controller');
const getAllUsers = require('./getAll.controller');
const updateAllUser = require('./update.controller');
const loginUser = require('./login.controller');
const authenticateUser = require('../../helper/JWT/authenticateUser.helper');
 
const router = express.Router();

router.post('/user',   (req,res) => {return createUser(req,res)});
router.get('/user/:id', authenticateUser, (req,res) => {return getAUser(req,res)});
router.get('/user',authenticateUser,(req,res) => { return getAllUsers(req,res)});
router.put('/user/:id',authenticateUser,(req,res) => {return updateAllUser(req,res)});
router.post('/user/login',(req,res) => {return loginUser(req,res)});

module.exports = router;
