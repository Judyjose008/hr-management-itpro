require('dotenv').config();
const express = require('express');
const createVendor = require('./create.controller');
const getAllVendors = require('./getAll.controller');
const getAVendor = require('./get.controller');
const updateAllVendor = require('./update.controller');
const deleteAVendor = require('./delete.controller');
const authenticateUser = require('../../helper/JWT/authenticateUser.helper');

const router = express.Router();

router.post('/vendor', authenticateUser, (req,res) => { return createVendor(req,res)});
router.get('/vendor', authenticateUser,  (req,res) => { return getAllVendors(req,res)});
router.get('/vendor/:id', authenticateUser, (req,res) => { return getAVendor(req,res)});
router.put('/vendor/:id', authenticateUser, (req,res) => { return updateAllVendor(req,res)});
router.delete('/vendor/:id', authenticateUser, (req,res) => { return deleteAVendor( req,res) });

module.exports = router;