import joi from "joi";

export const generalFields = {
    email: joi.string().email().required(),
    password: joi.string().required(),
    cpassword: joi.string().required(),
    id: joi.string().min(24).max(24).required(),
    file : joi.object({
        size : joi.number().positive().required(),
        path : joi.string().required(),
        filename : joi.string().required(),
        destination : joi.string().required(),
        mimetype : joi.string().required(),
        encoding : joi.string().required(),
        originalname : joi.string().required(),
        fieldname : joi.string().required(),
        dest : joi.string(),
    })
}


export const validation = (schema) => {
    return (req, res, next) => {
        const inputData = { ...req.body, ...req.params, ...req.query };
        if (req.file || req.files) {
            inputData.file = req.file || feq.files
        }
        const validationResult = schema.validate(inputData, { abortEarly: true });
        if (validationResult.error) {
            return res.status(400).json({ message: "Validation Error", validationError: validationResult.error?.details });
        }
        next();
    }
}