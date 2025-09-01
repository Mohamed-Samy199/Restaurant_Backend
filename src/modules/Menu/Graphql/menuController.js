import menuModel from "../../../DB/Models/menu.model.js";
import { paginate } from "../../../utils/paginate/paginate.js";

export const allMenu = async (parent, args) => {
    const menu = await menuModel.find({}).sort({ createdAt: -1 }).populate([
        {
            path: "createdBy"
        },
        {
            path: "categoryId"
        }
    ]);

    return {
        message: "menu list",
        status: 200,
        data: menu
    }
}

export const allMenuByPagintion = async (parent, args) => {
    const { skip, limit } = paginate(args.page, args.limit);
    const totalCount = await menuModel.countDocuments();

    const menu = await menuModel.find({})
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .populate([
            {
                path: "createdBy"
            },
            {
                path: "categoryId"
            }
        ]);

    return {
        message: "menu list",
        status: 200,
        totalCount,
        data: menu
    }
}

export const menuById = async (parent, args) => {
    const menu = await menuModel.findById(args.id).populate([
        {
            path: "createdBy"
        },
        {
            path: "categoryId"
        }
    ])
    if (!menu) {
        return { message: "menu not found", status: 404 }
    }
    return {
        message: "menu list",
        status: 200,
        data: menu
    }
}

