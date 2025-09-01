import { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLEnumType } from "graphql";

export const userResponse = new GraphQLObjectType({
    name: "userResponse",
    fields: {
        _id: { type: GraphQLID },
        userName: { type: GraphQLString },
        email: { type: GraphQLString },
        role: {
            type: new GraphQLEnumType({
                name: "roleEnum",
                values: {
                    User: { type: GraphQLString },
                    Admin: { type: GraphQLString },
                    Employee: {type : GraphQLString }
                }
            })
        }
    }
})