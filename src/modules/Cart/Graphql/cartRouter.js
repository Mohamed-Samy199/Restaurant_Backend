import { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { cartResponse } from "./cart.types.js";
import { cartList, cartListForTable } from "./cartController.js";




const carts = new GraphQLObjectType({
    name: "cart",
    description: "data of response cart",
    fields: {
        status: { type: GraphQLInt },
        message: { type: GraphQLString },
        totalOfCarItems: { type: GraphQLInt },
        data: { type: cartResponse }
    }
});

export const query = {
    cartList: {
        type: carts,
        args: { authorization: { type: new GraphQLNonNull(GraphQLString) } },
        resolve: cartList
    },

    cartListForTable: {
        type: carts,
        args: { tableNumber: { type: new GraphQLNonNull(GraphQLInt) } },
        resolve: cartListForTable
    }
}