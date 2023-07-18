require('dotenv').config();
const express = require('express');
const router = express.Router();
const createCategory = require('./create.controller');
const getACategory = require("./get.controller");
const getAllCategory = require("./getAll.controller");
const deleteACategory = require('./delete.controller');
const updateACategory = require('./update.controller');
const authenticateUser = require('../../helper/JWT/authenticateUser.helper');

router.post('/category', authenticateUser ,(req, res) => { return createCategory(req, res) });
router.get("/category/:id", authenticateUser ,(req, res) => { return getACategory(req, res) });
router.get("/category", authenticateUser ,(req, res) => { return getAllCategory(req, res) });
router.delete('/category/:id', authenticateUser ,(req,res) => { return deleteACategory(req,res)});
router.put('/category/:id', authenticateUser ,(req,res) => { return  updateACategory(req,res)});

module.exports = router;