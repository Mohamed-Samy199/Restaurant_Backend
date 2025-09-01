import userModel from "../../DB/Models/user.model.js"
import { paginate } from "../../utils/paginate/paginate.js";


export const getAllUsers = async (parent, args) => {
    const users = await userModel.find({});
    return {
        message: "Done",
        status: 200,
        data: users
    };
};

export const getUsersBypagintion = async (parent, args) => {
    const { skip, limit } = paginate(args.page, args.limit);

    const totalCount = await userModel.countDocuments();

    const users = await userModel.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    return {
        message: "Done",
        status: 200,
        totalCount,
        data: users
    };
};