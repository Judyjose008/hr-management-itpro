const baseResponse = require("../../helper/baseResponse/baseResponse");
const Menu = require('./menu.schema');
const { createMenuValidator } = require("./menu.validator");

const createMenu = async(req,res) => {
    try {
        let validated = createMenuValidator.validate(req.body);
        if(validated.error) return res.status(400).json(baseResponse(400, validated.error.details[0].message, {}));

        const {menu_name, menu_type, active} = req.body;
        const menu_exists = await Menu.exists({menu_name, menu_type});
        if(menu_exists) return res.status(400).json(baseResponse(400, "Menu Already Exists", {}));

        const menu = new Menu({
            menu_name: menu_name,
            menu_type: menu_type,
            active: active
        });
        await menu.save();
        return res.status(200).json(baseResponse(200, "Menu Created", menu));
    } catch (error) {
        return res.status(500).json(baseResponse(500, "Internal Server Error", {error}));
    }
}

module.exports = createMenu;