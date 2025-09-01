import { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLEnumType, GraphQLString } from "graphql";
import { userResponse } from "../../Auth/Graphql/user.types.js";
import moment from "moment/moment.js";

//Type Of Table Item
export const tableItem = new GraphQLObjectType({
    name: "tableItem",
    description: "type of table item",
    fields: {
        _id: { type: GraphQLID },
        tableNumber: { type: GraphQLInt },
        qrcode: { type: GraphQLString },
        createdBy: { type: userResponse },
        active: {
            type: new GraphQLEnumType({
                name: "statusOfTable",
                values: {
                    available: { type: GraphQLString },
                    reserved: { type: GraphQLString },
                    occupied: { type: GraphQLString }
                }
            })
        },
        createdAt: {
            type: GraphQLString,
            resolve: (parent) => moment(parent.createdAt).format("YYYY-MM-DD HH-mm-ss")
        }
    }
});

//Type of qrcode and url menu
export const qrcodeResponse = new GraphQLObjectType({
    name: "qrcode",
    description: "type of qrcode",
    fields: {
        status: { type: GraphQLInt },
        message: { type: GraphQLString },
        qrCodeImage: { type: GraphQLString },
        qrURL: { type: GraphQLString },
    }
})