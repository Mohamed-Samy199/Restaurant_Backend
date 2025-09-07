import cartModel from "../../DB/Models/cart.model.js";
import menuModel from "../../DB/Models/menu.model.js";
import { successResponse } from "../../utils/response/successResponse.js";




export const listOfCart = async (req, res, next) => {
    const { tableNumber } = req.params;

    // if (!req.user) {
    //     return res.status(401);
    // };
    // const userId = req.user?._id;
    // const filter = userId ? { userId } : { tableNumber };

    // const cart = await cartModel.findOne(filter).populate([
    //     {
    //         path: "menus.menuId",
    //         populate:
    //             [
    //                 {
    //                     path: "categoryId"
    //                 }, {
    //                     path: "createdBy"
    //                 }
    //             ]
    //     }
    // ]);
    // if (!cart) {
    //     throw new Error("user not have cart");
    // }
    const cart = await cartModel
        .findOne({tableNumber})
        .populate([
            {
                path: "menus.menuId",
                populate: [
                    { path: "categoryId" },
                    { path: "createdBy" }
                ]
            }
        ])
        .lean();

    if (!cart) {
        throw new Error("user not have cart");
    };

    return successResponse({
        res,
        data: { cart }
    });
};

export const createOrUpdateCart = async (req, res, next) => {
    const { menuId, quntity } = req.body;
    const { tableNumber } = req.params;
    const userId = req.user?._id;

    const menu = await menuModel.findById(menuId);
    if (!menu) {
        return next(new Error("Menu not found", { cause: 404 }));
    }

    // if (menu.stock < quntity) {
    //     return next(new Error(`Invalid quantity. Max available is ${menu.stock}`, { cause: 400 }));
    // }

    const filter = userId ? { userId } : { tableNumber };
    const newCartData = userId
        ? { userId, menus: [{ menuId, quntity }] }
        : { tableNumber, menus: [{ menuId, quntity }] };

    let cart = await cartModel.findOne(filter);

    if (!cart) {
        const newCart = await cartModel.create(newCartData);
        return successResponse({ res, status: 201, data: { newCart } });
    }

    let matchMenu = false;
    for (let item of cart.menus) {
        if (item.menuId.toString() === menuId) {
            item.quntity = quntity;
            matchMenu = true;
            break;
        }
    }

    if (!matchMenu) {
        cart.menus.push({ menuId, quntity });
    }

    await cart.save();
    return successResponse({ res, data: { cart } });
};

export async function deleteItemFromCart({ menuId, userId, tableNumber }) {
    const filter = userId ? { userId } : { tableNumber };

    const cart = await cartModel.updateOne(filter, {
        $pull: {
            menus: {
                menuId: { $in: menuId }
            }
        }
    });

    return cart;
};

export const deleteItem = async (req, res, next) => {
    const { menuId, tableNumber } = req.params;
    const userId = req.user?._id;

    if (!menuId) {
        return next(new Error("Menu ID not found", { cause: 404 }));
    }

    if (!userId && !tableNumber) {
        return next(new Error("No user or table context provided", { cause: 400 }));
    }

    const cart = await deleteItemFromCart({ menuId, userId, tableNumber });

    return successResponse({ res, data: { cart } });
};

export const empatyCart = async ({ userId, tableNumber }) => {
    const filter = userId ? { userId } : { tableNumber };
    const cart = await cartModel.updateOne(filter, { menus: [] });
    return cart;
};

export const clearCart = async (req, res, next) => {
    const userId = req.user?._id;
    const { tableNumber } = req.params;

    if (!userId && !tableNumber) {
        return next(new Error("userId or tableNumber is required", { cause: 400 }));
    }

    const cart = await empatyCart({ userId, tableNumber });
    return successResponse({ res, data: { cart } });
};

export const updataQuantityCart = async (req, res, next) => {
    const { menuId, action } = req.body;
    const { tableNumber } = req.params;
    const userId = req.user?._id;

    if (!menuId || !action || (!userId && !tableNumber)) {
        return next(new Error("Missing required data", { cause: 400 }));
    }

    const filter = userId ? { userId } : { tableNumber };
    let cart = await cartModel.findOne(filter);

    if (!cart) {
        return next(new Error("Cart not found", { cause: 404 }));
    }

    const menuIndex = cart.menus.findIndex(menu => menu.menuId.equals(menuId));

    if (menuIndex !== -1) {
        if (action === "increase") {
            cart.menus[menuIndex].quntity += 1;
        } else if (action === "decrease" && cart.menus[menuIndex].quntity > 1) {
            cart.menus[menuIndex].quntity -= 1;
        } else {
            return next(new Error("Invalid action or quantity", { cause: 400 }));
        }
    } else {
        return next(new Error("Menu item not found in cart", { cause: 404 }));
    }

    await cart.save();
    return successResponse({ res, data: { cart } });
};