const baseResponse = require('../../helper/baseResponse/baseResponse');
const User = require('./user.schema');
const { validatePassword } = require('../../helper/bcrypt/bcrypt');
const generateUserJWTToken = require('../../helper/JWT/generateUserJWTToken.helper');
const { loginValidator } = require('./user.validator');

const loginUser = async (req, res) => {
    let validated = loginValidator.validate(req.body);
    if(validated.error) return res.status(400).json(baseResponse(400, validated.error.details[0].message,{}));
    const { email, password } = req.body;
    try {
        let validated = loginValidator.validate(req.body);
        if(validated.error) return res.status(400).baseResponse(400,validated.error.details[0].message,{})
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json(baseResponse(401, "Invalid email or password",{}));
        const isPasswordValid = await validatePassword(password, user.password);
        if (!isPasswordValid) return res.status(401).json(baseResponse(401, "Invalid Email or Password",{}));
        // If email and password are valid, create a JWT token and send it in the response
        const token = generateUserJWTToken(user);
        return res.status(200).json(baseResponse(200, "JWT token created", {token:token}));
    } catch (error) {
        return res.status(500).json(baseResponse(500, "Internal Server Error", {error}));
    }
}
module.exports = loginUser;