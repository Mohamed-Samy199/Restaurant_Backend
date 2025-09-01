import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import moment from "moment/moment.js";
import { menuItem } from "../../Menu/Graphql/menu.types.js";

export const categoryType = new GraphQLObjectType({
    name: "categoryList",
    fields: {
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        createdBy: { type: GraphQLID },
        updatedBy: { type: GraphQLID },
        createdAt: {
            type: GraphQLString,
            resolve: (parent, args) => moment(parent.createdAt).format("YYYY-MM-DD HH:mm:ss")
        },
        menu: { type: new GraphQLList(menuItem) }
    }
})