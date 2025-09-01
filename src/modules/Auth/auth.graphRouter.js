import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql"
import { getAllUsers, getUsersBypagintion } from "./aurh.graphController.js"
import moment from "moment/moment.js";

const AllUserType = new GraphQLObjectType({
    name: "allUsers",
    description: "response of success return all users.",
    fields: {
        _id: { type: GraphQLID },
        userName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        role: { type: GraphQLString },
        isConfirmed: { type: GraphQLBoolean },
        createdAt: {
            type: GraphQLString,
            resolve: (parent) => moment(parent.createdAt).format("YYYY-MM-DD HH:mm:ss")
            // .format("Do MMMM YYYY, h:mm:ss a")
        }
    }
});



export const query = {
    uesrs: {
        type: new GraphQLObjectType({
            name: "usersResponse",
            description: "response of success return users.",
            fields: {
                message: { type: GraphQLString },
                status: { type: GraphQLInt },
                data: {
                    type: new GraphQLList(AllUserType)
                }
            }
        }),
        resolve: getAllUsers
    },

    uesrsByPagintion: {
        type: new GraphQLObjectType({
            name: "usersPagintionResponse",
            description: "response of success return users Pagintion.",
            fields: {
                message: { type: GraphQLString },
                status: { type: GraphQLInt },
                totalCount: { type: GraphQLInt },
                data: {
                    type: new GraphQLList(AllUserType)
                }
            }
        }),
        args: {
            page: { type: GraphQLInt },
            limit: { type: GraphQLInt }
        },
        resolve: getUsersBypagintion
    }
}