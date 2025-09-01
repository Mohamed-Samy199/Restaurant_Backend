import { generalFields } from "../../Middelware/validation.js";
import joi from "joi";


export const registerValidation = joi.object().keys({
    userName : joi.string().required().trim().min(2).max(30),
    email : generalFields.email,
    password : generalFields.password
}).required();

export const loginValidation = joi.object().keys({
    email : generalFields.email,
    password : generalFields.password
}).required();
