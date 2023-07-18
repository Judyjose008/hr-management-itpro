const baseResponse = require('../../helper/baseResponse/baseResponse');
const { createUserValidator } = require('./user.validator');
const User = require('./user.schema');
const { hashPassword } = require('../../helper/bcrypt/bcrypt');
const generateUserJWTToken = require('../../helper/JWT/generateUserJWTToken.helper');


const createUser = async (req, res) => {
  try {
    let validated = createUserValidator.validate(req.body);
    if (validated.error) return res.status(400).json(baseResponse(400, validated.error.details[0].message, {}));
    const { first_name, last_name, phone_number, email, password } = req.body;
    const userFound = await User.findOne({ email: email });
    if (userFound) return res.status(400).json(baseResponse(400, 'Email already exists', {}));
    const user = new User({
      first_name: first_name,
      last_name: last_name,
      phone_number: phone_number,
      email: email,
      password: await hashPassword(password)
    });
    await user.save();
    const token = generateUserJWTToken(user);
    return res.status(200).json(baseResponse(200, "User Created", {user, token: token } ));
  } catch (error) {
    res.status(500).json(baseResponse(500, "Internal Server Error", { error }));
  }
}
module.exports = createUser;