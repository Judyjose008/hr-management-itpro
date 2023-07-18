const baseResponse = require("../../helper/baseResponse/baseResponse");
const User = require("./user.schema");

const getAllUsers = async(req,res) => {
    try{
        const user = await User.find().select("-password");;
        if(!user) return res.status(404).json(baseResponse(404, "User not Found",{}));
        return res.status(200).json(baseResponse(200,"User Fetched", user));   
    } catch(error) {
        res.status(500).json(baseResponse(500,"Internal Server Error",{error}));
    }
}
module.exports = getAllUsers;
