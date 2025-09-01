import categoryModel from "../../../DB/Models/category.model.js"
import { paginate } from "../../../utils/paginate/paginate.js";

export const allCategory = async (parent, args) => {
    const categories = await categoryModel.find({})
        .populate({
            path: "menu",
            selected: "name descraption price finalPrice image"
        });

    return {
        message: "all categories",
        status: 200,
        data: categories
    }
};

export const allCategoryWithPaginstion = async (parent, args) => {
    const { skip, limit } = paginate(args.page, args.limit);

    const totalCount = await categoryModel.countDocuments();
    const categories = await categoryModel.find({})
        .skip(skip)
        .limit(limit)
        .populate({
            path: "menu",
            selected: "name descraption price finalPrice image"
        });

    return {
        message: "all categories",
        status: 200,
        totalCount,
        data: categories
    }
};

export const getCategoryById = async (parent, args) => {
    const category = await categoryModel.findById(args.id).populate({
        path: "menu",
        selected: "name descraption price finalPrice image"
    });

    if (!category) {
        return { message: "Category not found", status: 404 }
    }

    return {
        message: "Done",
        status: 200,
        data: category
    }
}