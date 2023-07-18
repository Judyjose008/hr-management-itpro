require('dotenv').config();
const express = require('express');
const authenticateUser = require('../../helper/JWT/authenticateUser.helper');
const router = express.Router();
const multer = require("multer");
const uploadImage = require('./create.contoller');
const deleteImageFromS3 = require('./delete.controller');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/image', authenticateUser, upload.array("images", 15), (req, res) => { return uploadImage(req, res) });
router.delete('/image/:id', authenticateUser, (req, res) => { return deleteImageFromS3(req, res) });

module.exports = router;
