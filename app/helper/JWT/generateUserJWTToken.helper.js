require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateUserJWTToken = (user) => { return jwt.sign({ user }, process.env.ACCESS_TOKEN, { expiresIn: '15d' }) }

module.exports = generateUserJWTToken;