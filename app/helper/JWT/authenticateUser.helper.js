require('dotenv').config();
const jwt = require('jsonwebtoken');
const baseResponse = require('../baseResponse/baseResponse');

const checkRoleWizeAuthority = (roles, tokenRoles) => {
    return roles.every((element) => tokenRoles.includes(element));
}; 

const authenticateUser = (roles) => async (req, res, next) => {
    let token;

    if (req.cookies && req.cookies.token) token = req.cookies.token;
    else if (req.headers.authorization) token = req.headers.authorization.split(" ")[1];
    else return res.status(401).json(baseResponse(401, 'No token found! Login again', {}));

    if (token == null) return res.status(401).json(baseResponse(401, 'No token found! Login again', {}));

    try {
        const authData = await jwt.verify(token, process.env.ACCESS_TOKEN);

        if (authData && checkRoleWizeAuthority(roles, authData.user.roles)) { 
            req.user = authData.user; 
            next(); 
        }
        else { return res.status(401).json(baseResponse(401, 'Token expired! Login again', {})); }
    } catch (error) {
        return res.status(500).json(baseResponse(500, 'Internal Server Error', { error }));
    }
}

module.exports = authenticateUser;
