import joi from "joi";
import { generalFields } from "../../Middelware/validation.js";


export const addTableValidtion = joi.object().keys({
    tableNumber: joi.number().positive().required(),
}).required();

export const tableValidtion = joi.object().keys({
    tableNumber: joi.number().positive(),
    tableId: generalFields.id
}).required();