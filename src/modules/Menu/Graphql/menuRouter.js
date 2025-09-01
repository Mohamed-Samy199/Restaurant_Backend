import {
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
} from "graphql";
import { allMenu, allMenuByPagintion, menuById } from "./menuController.js";
import { menuItem } from "./menu.types.js";





//List Menu
const menus = new GraphQLObjectType({
    name: "menus",
    description: "get all menus",
    fields: () => ({
        message: { type: GraphQLString },
        status: { type: GraphQLInt },
        data: { type: new GraphQLList(menuItem) }
    })
});

//Pagination Menu
const menusPagination = new GraphQLObjectType({
    name: "menusPagination",
    description: "get all menus by Pagination",
    fields: () => ({
        message: { type: GraphQLString },
        status: { type: GraphQLInt },
        totalCount: { type: GraphQLInt },
        data: { type: new GraphQLList(menuItem) }
    })
});

//One Menu
const oneMenu = new GraphQLObjectType({
    name: "menuById",
    description: "get one menu by id",
    fields: () => ({
        message: { type: GraphQLString },
        status: { type: GraphQLInt },
        data: { type: menuItem }
    })
});

// Queries
export const query = {
    menuList: {
        type: menus,
        resolve: allMenu
    },
    menusByPagination: {
        type: menusPagination,
        args: {
            page: { type: GraphQLInt },
            limit: { type: GraphQLInt }
        },
        resolve: allMenuByPagintion
    },
    menuById: {
        type: oneMenu,
        args: {
            id: { type: GraphQLID }
        },
        resolve: menuById
    }
};
