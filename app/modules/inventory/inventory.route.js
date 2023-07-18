require('dotenv').config();
const express = require('express');
const authenticateUser = require('../../helper/JWT/authenticateUser.helper');
const router = express.Router();

const createMenu = require('./create.controller');
const deleteAInventory = require('./delete.controller');
const getAInventory = require('./get.controller');
const getAllInventory = require('./getAll.controller');
const updateAInventory = require('./update.controller');

router.post('/inventory', (req, res) => { return createMenu(req, res) });
router.get('/inventory', (req, res) => { return getAllInventory(req,res) });
router.get('/inventory/:id', (req, res) => { return getAInventory(req, res) });
router.put('/inventory/:id', (req, res) => { return updateAInventory(req, res) });
router.delete('/inventory/:id', (req, res) => { return deleteAInventory(req, res) });

module.exports = router;

