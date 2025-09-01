import { GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { menuItem } from "../../Menu/Graphql/menu.types.js";
import moment from "moment";


const menusResponse = new GraphQLObjectType({
    name: "menusList",
    description: "type of menus",
    fields: {
        _id: { type: GraphQLID },
        menuId: { type: menuItem },
        quntity: { type: GraphQLInt }
    }
});

export const cartResponse = new GraphQLObjectType({
    name: "cartResponse",
    description: "type of cart response",
    fields: {
        _id: { type: GraphQLID },
        userId: { type: GraphQLID },
        tableNumber: { type: GraphQLInt },
        menus: { type: new GraphQLList(menusResponse) },
        createdAt: {
            type: GraphQLString,
            resolve: (parent) => moment(parent.createdAt).format("YYYY-MM-DD HH-mm-ss")
        }
    }
});