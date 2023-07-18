require('dotenv').config();
const express = require('express');
const authenticateUser = require('../../helper/JWT/authenticateUser.helper');
const router = express.Router();

const createOrder = require('./create.controller');
const getAOrder = require('./get.controller');
const  getAllOrder = require('./getAll.controller');
const updateAOrder = require('./update.controller');
const deleteAOrder = require('./delete.controller');

router.post('/order', (req,res) => {return createOrder(req,res)});
router.get('/order', (req, res) => { return getAllOrder(req,res)});
router.get('/order/:id', (req,res) => { return getAOrder(req, res)});
router.put('/order/:id', (req,res) => { return updateAOrder(req, res)});
router.delete('/order/:id', (req, res) => { return deleteAOrder(req,res)});

module.exports = router;

