const baseResponse = require("../../helper/baseResponse/baseResponse");
const User = require("./user.schema");
const { getAUserValidator} = require("./user.validator");

const getAUser = async(req,res) => {
    try{
        let validated = getAUserValidator.validate(req.params);
        if(validated.error) return res.status(400).json(baseResponse(400, validated.error.details[0].message,{}));
        const {id} = req.params;
        const user = await User.findById({_id:id}).select("-password");
        if(!user){
            res.status(404).json(baseResponse(404, "User not Found",{}));
        } else {
            return res.status(200).json(baseResponse(200,"User Fetched", user));
        }      
    } catch(error) {
        res.status(500).json(baseResponse(500,"Internal Server Error",{error}));
    }
}
module.exports = getAUser;
