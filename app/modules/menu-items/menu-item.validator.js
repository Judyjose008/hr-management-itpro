const { boolean } = require('joi');
const Joi = require('joi');

const createMenuItemValidator = Joi.object({
  item_name: Joi.string().required(),
  price: Joi.number().required(),
  category_id: Joi.string().required(),
  subcategory_id: Joi.string().required(),
  menu_id: Joi.string().required(),
  images: Joi.array().items(Joi.string()),
  non_veg: Joi.boolean().required(),
  ingredients: Joi.array().items(
    Joi.object({
      inventory: Joi.string().required(),
      quantity: Joi.number().required()
    })
  ).required()
});
const getAllMenuItemQueryValidator = Joi.object({
  limit: Joi.string().empty(),
  page_no: Joi.string(),
  item_name: Joi.string(),
  menu_id: Joi.string(),
  category_id: Joi.string(),
  subcategory_id: Joi.string(),
  active: Joi.boolean(),
  non_veg: Joi.boolean(),

});
const getADetailMenuItemValidator = Joi.object({
  id: Joi.string().required()
});
const updateMenuItemValidator = Joi.object({
  item_name: Joi.string().required(),
  price: Joi.number().required(),
  category_id: Joi.string().required(),
  subcategory_id: Joi.string().required(),
  menu_id: Joi.string().required(),
  images: Joi.array().items(Joi.string()),
  non_veg: Joi.boolean().required(),
  ingredients: Joi.array().items(
    Joi.object({
      inventory: Joi.string().required(),
      quantity: Joi.number().required()
    })
  ).required(),
  active: Joi.boolean()
});

const updateMenuItemIdValidator = Joi.object({
  id: Joi.string().required()
});

const deleteMenuItemValidator = Joi.object({
  id: Joi.string().required()
});

module.exports = {
  createMenuItemValidator,
  getAllMenuItemQueryValidator,
  getADetailMenuItemValidator,
  updateMenuItemValidator,
  updateMenuItemIdValidator,
  deleteMenuItemValidator
}


