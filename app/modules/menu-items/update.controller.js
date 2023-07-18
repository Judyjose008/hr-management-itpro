const baseResponse = require('../../helper/baseResponse/baseResponse');
const Item = require('./menu-item.schema');
const {updateMenuItemValidator,updateMenuItemIdValidator} = require('./menu-item.validator');

const updateMenuitem = async(req,res) => {
    try {
        const validated = updateMenuItemValidator.validate(req.body);
        if (validated.error) return res.status(400).json(baseResponse(400, validated.error.details[0].message, {}));

        const validate_id = updateMenuItemIdValidator.validate(req.params);
        if(validate_id.error) return res.status(400).json(baseResponse(400, validate_id.error.details[0].message, {}));
        const {id} = req.params;
     
        const { item_name, price, category_id, subcategory_id, menu_id, ingredients, images,non_veg } = req.body;
        
        const item_exists = await Item.exists({item_name,subcategory_id, category_id,menu_id});
        if(item_exists) return res.status(400).json(baseResponse(400, "Item Already Exists", {}));
        
        const item = await Item.findByIdAndUpdate(id, {
            item_name,
            price,
            category:category_id,
            subcategory:subcategory_id,
            menu:menu_id, 
            ingredients,
            non_veg,
            images:images.length === 0 ? 'https://dinedirect-rms-images.s3.ca-central-1.amazonaws.com/RMS_IMAGE_923429174559332222' : images,
            updated_at: Date.now()
         }, {new: true});
        if (!item) return res.status(404).json(baseResponse(404, "Item not found", {}));
        return res.status(200).json(baseResponse(200, "Item updated", item));
    } catch (error) {
        return res.status(500).json(baseResponse(500, "Internal server error", { error }));
    }
}
module.exports = updateMenuitem;