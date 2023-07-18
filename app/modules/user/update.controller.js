const baseResponse = require("../../helper/baseResponse/baseResponse");
const User = require("./user.schema");
const { updateUserValidator, updateUserIdValidator } = require("./user.validator");
const { hashPassword } = require('../../helper/bcrypt/bcrypt');
const updateAllUser = async (req, res) => {
    try {
        let validated = updateUserValidator.validate(req.body);
        if (validated.error) return res.status(400).json(baseResponse(400, validated.error.details[0].message, {}));
        const validate_id = updateUserIdValidator.validate(req.params);
        if (validate_id.error) return res.status(400).json(baseResponse(400, validated.error.details[0].message, {}));
        const user_id = req.params.id;
        const updated_user = req.body;
        const password = updated_user.password;
        if (password) updated_user.password = await hashPassword(password);
        const user = await User.findByIdAndUpdate(user_id, updated_user, { new: true }).select("-password");
        if (!user) return res.status(404).json(baseResponse(404, "User Not Found", {}));
        return res.status(200).json(baseResponse(200, "User details updated successfully", user));
    } catch (error) {
        return res.status(500).json(baseResponse(500, "Internal Server Error", { error }));
    }
}
module.exports = updateAllUser;