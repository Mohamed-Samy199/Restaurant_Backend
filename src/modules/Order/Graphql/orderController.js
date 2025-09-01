import orderModel from '../../../DB/Models/order.model.js'
import { paginate } from '../../../utils/paginate/paginate.js';


export const allOrders = async (parent, args) => {
    const orders = await orderModel.find({}).sort({ createdAt: -1 }).populate([
        {
            path: "userId"
        },
        {
            path: "menus.menu",
            populate:
                [
                    {
                        path: "categoryId"
                    }, {
                        path: "createdBy"
                    }
                ]
        }
    ]);

    return {
        message: "order list",
        status: 200,
        data: orders
    }
};

export const allOrdersByPagination = async (parent, args) => {
    const { skip, limit } = paginate(args.page, args.limit);

    const totalCount = await orderModel.countDocuments();

    const orders = await orderModel.find({})
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate([
        {
            path: "userId"
        },
        {
            path: "menus.menu",
            populate:
                [
                    {
                        path: "categoryId"
                    }, {
                        path: "createdBy"
                    }
                ]
        }
    ]);

    return {
        message: "order list",
        status: 200,
        totalCount,
        data: orders
    }
};