import { GraphQLBoolean, GraphQLFloat, GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import { categoryType } from "../../Category/Graphql/category.types.js";
import { userResponse } from "../../Auth/Graphql/user.types.js";
import moment from "moment";

//Image Type
const imageAttachement = new GraphQLObjectType({
    name: "getImage",
    description: "get image url",
    fields: () => ({
        secure_url: { type: GraphQLString },
        public_id: { type: GraphQLString }
    })
});

//Type Of Menu Item
export const menuItem = new GraphQLObjectType({
    name: "menuItem",
    description: "get menu list",
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        descraption: { type: GraphQLString },
        price: { type: GraphQLInt },
        image: { type: imageAttachement },
        stock: { type: GraphQLInt },
        discount: { type: GraphQLInt },
        finalPrice: { type: GraphQLFloat },
        isAvailable: { type: GraphQLBoolean },
        categoryId: { type: categoryType },
        createdBy: { type: userResponse },
        createdAt: {
            type: GraphQLString,
            resolve: (parent, args) => moment(parent.createdAt).format("YYYY-MM-DD HH:mm:ss")
        }
    })
});