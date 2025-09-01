import categoryModel from "../../DB/Models/category.model.js";
import { successResponse } from "../../utils/response/successResponse.js";

export const categories = async (req, res) => {
    const allCategoryies = await categoryModel.find({});
    return successResponse({ res, data: { allCategoryies } })
}
export const addCategory = async (req, res, next) => {
    const { name } = req.body;

    if (await categoryModel.findOne({ name })) {
        return next(new Error(`Dublicate category name ${name}`, { cause: 409 }));
    }

    const category = await categoryModel.create({ name, createdBy: req.user._id });
    return successResponse({ res, status: 201, data: { category } });
}

export const updateCategory = async (req, res, next) => {
    const { categoryId } = req.params;
    const { name } = req.body;

    const categoryExist = await categoryModel.findById(categoryId)
    if (!categoryExist) {
        return next(new Error(`category not exsit`, { cause: 404 }));
    }

    if (name && name === categoryExist.name) {
        return next(new Error(`this anther category at same name ${name}`, { cause: 404 }));
    }

    const category = await categoryModel.findByIdAndUpdate(categoryId, { name, updatedBy: req.user._id }, { new: true });
    if (!category) {
        return next(new Error(`category not updated`, { cause: 409 }));
    }
    return successResponse({ res, data: { category } });
}

export const deleteCategory = async (req, res, next) => {
    const { categoryId } = req.params;

    const categoryExist = await categoryModel.findById(categoryId)
    if (!categoryExist) {
        return next(new Error(`category not exsit`, { cause: 404 }));
    }

    
    if (!await categoryModel.findByIdAndDelete(categoryId)) {
        return next(new Error(`category not deleted`, { cause: 409 }));
    }
    return successResponse({ res });
}
