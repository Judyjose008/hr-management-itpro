const baseResponse = require('../../helper/baseResponse/baseResponse');
const Item = require('./menu-item.schema');
const { createMenuItemValidator } = require('./menu-item.validator');

const createMenuItem = async (req, res) => {
    try {
        const validated = createMenuItemValidator.validate(req.body);
        if (validated.error) return res.status(400).json(baseResponse(400, validated.error.details[0].message, {}));
        const { item_name, price, category_id, subcategory_id, menu_id, ingredients, images } = req.body;

        const menu_item_exists = await Item.exists({ item_name });
        if (menu_item_exists) return res.status(400).json(baseResponse(400, "Menu Item Already Exists", {}));

        const item = new Item({
            item_name: item_name,
            price: price,
            category: category_id,
            subcategory: subcategory_id,
            menu: menu_id,
            ingredients: ingredients,
            images: images.length === 0 ? 'https://dinedirect-rms-images.s3.ca-central-1.amazonaws.com/RMS_IMAGE_923429174559332222' : images
        });
        await item.save();
        return res.status(200).json(baseResponse(200, "Item Created", item));
    } catch (error) {
        return res.status(500).json(baseResponse(500, "Internal server error", { error }));
    }
}
module.exports = createMenuItem; 