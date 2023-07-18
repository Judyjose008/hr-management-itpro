require('dotenv').config();
const express = require('express');
const createBusinessHours = require('./create.controller');
const getStatus = require('./get-status.contoller');
const getBusinessHours = require('./get.controller');
const router = express.Router();
const authenticateUser = require('../../helper/JWT/authenticateUser.helper');

router.post('/business-hours',authenticateUser, (req, res) => { return createBusinessHours(req, res) });
router.get('/business-hours',authenticateUser, (req, res) => { return getBusinessHours(req, res) });
router.get('/business-hours/status',authenticateUser, (req, res) => { return getStatus(req, res) });

module.exports = router;