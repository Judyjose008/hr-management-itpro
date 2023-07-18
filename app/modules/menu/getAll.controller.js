const baseResponse = require("../../helper/baseResponse/baseResponse");
const Menu = require('./menu.schema');
const { getAllMenuQueryValidator } = require("./menu.validator");

const getAllMenu = async(req,res) => {
    try {
        let validated = getAllMenuQueryValidator.validate(req.query);
        if(validated.error) return res.status(400).json(baseResponse(400, validated.error.details[0].message, {}));

        const {limit, page_no, menu_type, menu_name,active} = req.query;
        const pageNo  = parseInt(page_no) || 1;
        const startIndex = (pageNo-1) * 10;
        const query = {};
        if(menu_name) query['menu_name'] = menu_name;
        if(menu_type) query['menu_type'] =menu_type;
        if(active) query['active'] = active; 
        const menus = await Menu.find(query).sort({_id: -1}).skip(startIndex).limit(parseInt(limit));
        const noOfTotalDocuments = await Menu.count();
        if(menus.length === 0) return res.status(404).json(baseResponse(404, "No Menu Found", {}));
        return res.status(200).json(baseResponse(200, "Menu Fetched", {menus, noOfTotalDocuments}))
    } catch (error) {
        return res.status(500).json(baseResponse(500, "Internal Server Error", {error}));
    }

}
module.exports = getAllMenu;