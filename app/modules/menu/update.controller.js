const baseResponse = require("../../helper/baseResponse/baseResponse");
const Menu = require('./menu.schema');
const { updateAMenuValidator,updateMenuIdValidator } = require("./menu.validator");

const updateAMenu = async(req,res) => {
    try {
        const validated = updateAMenuValidator.validate(req.body);
        if(validated.error) return res.status(400).json(baseResponse(400, validated.error.details[0].message, {}));
        const validate_id = updateMenuIdValidator.validate(req.params);
        if(validate_id.error) return res.status(400).json(baseResponse(400, validate_id.error.details[0].message, {}));

        const id = req.params.id;
        const {menu_name, menu_type, active} = req.body;
        const menu_exists = await Menu.exists({menu_name, menu_type, active});
        if(menu_exists) return res.status(400).json(baseResponse(400, "Menu Already Exists", {}));

        const menu = await Menu.findByIdAndUpdate(id, {menu_name: menu_name, menu_type: menu_type, active: active,  updated_at: Date.now()}, {new: true});
        if(!menu) return res.status(404).json(baseResponse(404, "Menu Not Found", {}));
        return res.status(200).json(baseResponse(200, "Menu Details Updated", menu));
    } catch (error) {
        return res.status(500).json(baseResponse(500, "Internal Server Error", {error}));
    }
}
module.exports = updateAMenu;