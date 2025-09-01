import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { orderType } from "./order.types.js";
import { allOrders, allOrdersByPagination } from "./orderController.js";


//List Order
const orders = new GraphQLObjectType({
    name: "orders",
    description: "get all orders",
    fields: () => ({
        message: { type: GraphQLString },
        status: { type: GraphQLInt },
        data: { type: new GraphQLList(orderType) }
    })
});

//List Order
const ordersByPagination = new GraphQLObjectType({
    name: "ordersByPagination",
    description: "get all orders by pagination",
    fields: () => ({
        message: { type: GraphQLString },
        status: { type: GraphQLInt },
        totalCount: { type: GraphQLInt },
        data: { type: new GraphQLList(orderType) }
    })
});

// Queries
export const query = {
    orderList: {
        type: orders,
        resolve: allOrders
    },

    // all orders by pagination
    ordersListByPagination: {
        type: ordersByPagination,
        args: {
            page: { type: GraphQLInt },
            limit: { type: GraphQLInt }
        },
        resolve: allOrdersByPagination
    }
};