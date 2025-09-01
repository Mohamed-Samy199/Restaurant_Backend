import { GraphQLEnumType, GraphQLFloat, GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import moment from "moment/moment.js";
import { menuItem } from "../../Menu/Graphql/menu.types.js";
import { userResponse } from "../../Auth/Graphql/user.types.js";


const menusResponse = new GraphQLObjectType({
    name: "ordersList",
    description: "type of menus",
    fields: {
        _id: { type: GraphQLID },
        menu: { type: menuItem },
        quntity: { type: GraphQLInt }
    }
});

export const orderType = new GraphQLObjectType({
    name: "orderList",
    fields: {
        _id: { type: GraphQLID },
        userId: { type: userResponse },
        tableNumber: { type: GraphQLInt },
        menus: { type: new GraphQLList(menusResponse) },
        source: {
            type: GraphQLString
        }
        ,
        count: { type: GraphQLInt },
        reason: { type: GraphQLString },
        tabelId: { type: GraphQLID },
        phoneCustom: { type: GraphQLString },
        address: { type: GraphQLString },
        details: { type: GraphQLString },
        note: { type: GraphQLString },
        supTotale: { type: GraphQLFloat },
        finalPrice: { type: GraphQLFloat },
        paymentType: {
            type: new GraphQLEnumType({
                name: "paymentTypeEnum",
                values: {
                    cash: { type: GraphQLString },
                    card: { type: GraphQLString }
                }
            })
        },
        status: {
            type: new GraphQLEnumType({
                name: "statusEnum",
                values: {
                    waitPayment: { type: GraphQLString },
                    placed: { type: GraphQLString },
                    canceled: { type: GraphQLString },
                    rejected: { type: GraphQLString },
                    onWay: { type: GraphQLString },
                    delivered: { type: GraphQLString },
                }
            })
        },


        updatedBy: { type: GraphQLID },
        createdAt: {
            type: GraphQLString,
            resolve: (parent, args) => moment(parent.createdAt).format("YYYY-MM-DD HH:mm:ss")
        },
    }
})