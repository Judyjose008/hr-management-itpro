require('dotenv').config();
const express = require('express');
const authenticateUser = require('../../helper/JWT/authenticateUser.helper');
const router = express.Router();
const createSubCategory = require('./create.controller');
const deleteASubCategory = require('./delete.controller');
const getASubCategory = require('./get.controller');
const getAllSubCategory = require('./getAll.controller');
const updateASubCategory = require('./update.controller');

router.post('/subcategory', authenticateUser, (req, res) => { return createSubCategory(req, res) });
router.get('/subcategory/:id', authenticateUser, (req, res) => { return getASubCategory(req, res) });
router.get('/subcategory', authenticateUser, (req, res) => { return getAllSubCategory(req, res) });
router.put('/subcategory/:id', authenticateUser, (req, res) => { return updateASubCategory(req, res) });
router.delete('/subcategory/:id', authenticateUser,(req, res) => { return deleteASubCategory(req, res) });

module.exports = router;
