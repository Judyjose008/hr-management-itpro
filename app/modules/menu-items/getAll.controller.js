const baseResponse = require('../../helper/baseResponse/baseResponse');
const Item = require('./menu-item.schema');
const { getAllMenuItemQueryValidator } = require('./menu-item.validator');

const getAllMenuitem = async (req, res) => {
    try {
        const validated = getAllMenuItemQueryValidator.validate(req.query);
        if (validated.error) return res.status(400).json(baseResponse(400, validated.error.details[0].message, {}));
        const { limit, page_no, item_name, menu_id, category_id, subcategory_id,non_veg, active } = req.query;
        const pageNo = parseInt(page_no) || 1;
        const startIndex = (pageNo - 1) * 10;
        const query = {};
        if (menu_id) query['menu'] = menu_id;
        if (item_name) query['item_name'] = item_name;
        if(category_id) query['category'] = category_id;
        if(subcategory_id) query['subcategory'] = subcategory_id;
        if(active === 'false') query['active'] = false;
        if(active === 'true') query['active'] =true;
        if(non_veg === 'true') query['non_veg'] = true;
        if(non_veg === 'false') query['non_veg'] = false;
        const menu_item = await Item.find(query)
            .populate('menu')
            .populate('category')
            .populate('subcategory')
            .populate('ingredients.inventory')
            .sort({ _id: -1 })
            .skip(startIndex)
            .limit(parseInt(limit));
        const noOfTotalDocuments = await Item.count();
        if (menu_item.length === 0) return res.status(404).json(baseResponse(404, "Menu Item Not Found", {}));
        return res.status(200).json(baseResponse(200, "Menu Item Fetched", { menu_item, noOfTotalDocuments }));
    } catch (error) {
        return res.status(500).json(baseResponse(500, "Internal Server Error", { error }));
    }
}
module.exports = getAllMenuitem;