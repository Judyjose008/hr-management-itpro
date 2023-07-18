const baseResponse = require("../../helper/baseResponse/baseResponse");
 
const Menu = require('./menu.schema');
const { getAMenuIdValidator } = require("./menu.validator");

const getAMenu = async(req,res) => {
    try {
        let validated = getAMenuIdValidator.validate(req.params);
        if(validated.error) return res.status(400).json(baseResponse(400, validated.error.details[0].message, {}));
        const {id} = req.params;
        const menu = await Menu.findById(id);
        if(!menu) return res.status(404).json(baseResponse(404, "Menu Not Found", {}));
        return res.status(200).json(baseResponse(200, "Menu Fetched", menu));
    } catch (error) {
        return res.status(500).json(baseResponse(500, "Internal Server Error", {error}));
    }
}
module.exports = getAMenu;