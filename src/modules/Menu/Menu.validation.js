import joi from "joi";
import { generalFields } from "../../Middelware/validation.js";


export const menuValidtion = joi.object().keys({
    name: joi.string().required().trim(),
    descraption: joi.string().required().trim().min(2),
    price: joi.number().positive().min(1).required(),
    discount: joi.number().positive().min(1).required(),
    stock: joi.number().positive().min(1),
    createdBy: generalFields.id,
    categoryId: generalFields.id,
    file: generalFields.file.required()
}).required();