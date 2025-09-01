import cartModel from "../../../DB/Models/cart.model.js";
import { auth } from "../../../Middelware/Graphql/authuntication.js";
import { endPoint } from "../../../utils/autharization.js";

export const cartList = async (parent, args) => {
    const { authorization } = args;
    const user = await auth({ authorization, accessRole: endPoint.user });


    const cart = await cartModel.findOne({ userId: user._id }).populate([
        {
            path: "menus.menuId",
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
    if (!cart) {
        throw new Error("user not have cart");
    }
    const totalOfCarItems = cart.menus.length;
    return {
        status: 200,
        message: "cart",
        data: cart,
        totalOfCarItems
    }
}

export const cartListForTable = async (parent, args) => {
    const { tableNumber } = args;


    const cart = await cartModel.findOne({ tableNumber }).populate([
        {
            path: "menus.menuId",
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
    if (!cart) {
        throw new Error("user not have cart");
    }
    const totalOfCarItems = cart.menus.length;
    return {
        status: 200,
        message: "cart",
        data: cart,
        totalOfCarItems
    }
}