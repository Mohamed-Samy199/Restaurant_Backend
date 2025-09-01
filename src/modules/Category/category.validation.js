import joi from "joi";
import { generalFields } from "../../Middelware/validation.js";

export const categoryValidtion = joi.object().keys({
    name : joi.string().required().trim(),
}).required();

export const updateCategoryValidtion = joi.object().keys({
    name : joi.string().required().trim(),
    categoryId : generalFields.id,
}).required();

export const deleteCategoryValidtion = joi.object().keys({
    categoryId : generalFields.id,
}).required();