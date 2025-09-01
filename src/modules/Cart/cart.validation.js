import joi from "joi";
import { generalFields } from "../../Middelware/validation.js";


export const addCartValidtion = joi.object().keys({
    totalOfCartPrice: joi.number().positive(),
    totalOfCarItems: joi.number().positive(),
    userId: generalFields.id,
    quntity: joi.number().positive(),
    menuId: generalFields.id
}).required();