require('dotenv').config();
const express = require('express');
const authenticateUser = require('../../helper/JWT/authenticateUser.helper');
const createMenu = require('./create.controller');
const deleteAMenu = require('./delete.controller');
const getAMenu = require('./get.controller');
const getAllMenu = require('./getAll.controller');
const updateAMenu = require('./update.controller');
const router = express.Router();

router.post('/menu', authenticateUser,(req,res) => { return createMenu(req,res) });
router.get('/menu',authenticateUser, (req,res) => {return getAllMenu(req,res)});
router.get('/menu/:id', authenticateUser,(req,res) => { return getAMenu(req,res)});
router.put('/menu/:id',authenticateUser,(req,res) => { return updateAMenu(req,res)});
router.delete('/menu/:id',authenticateUser,(req,res) => { return deleteAMenu(req,res)});


module.exports = router;