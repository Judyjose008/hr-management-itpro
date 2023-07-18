require('dotenv').config();
const express = require('express');
const authenticateUser = require('../../helper/JWT/authenticateUser.helper');
const getAMenuitem = require('./get.controller');
const router = express.Router();
const createItem = require('./create.controller');
const getAllMenuitem = require('./getAll.controller');
const deleteItem = require('./delete.controller');
const updateMenuitem = require('./update.controller');

router.post('/item', authenticateUser, (req, res) => {return createItem(req, res)});
router.get('/item', (req, res) => {return getAllMenuitem(req, res)});
router.get('/item/:id', (req, res) => {return getAMenuitem(req, res)});
router.put('/item/:id', authenticateUser, (req, res) => { return updateMenuitem(req, res)});
router.delete('/item/:id', authenticateUser, (req, res) => { return deleteItem(req, res)});

module.exports = router;