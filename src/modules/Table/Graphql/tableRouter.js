import { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull } from "graphql";
import { allTables, allTablesByPagination, fixedQR, generateQR, tableById } from "./tableController.js";
import { qrcodeResponse, tableItem } from "./table.types.js";



//Response Tables Items
const responseTable = new GraphQLObjectType({
    name: "tabelResponse",
    description: "all tables response",
    fields: {
        message: { type: GraphQLString },
        status: { type: GraphQLInt },
        data: { type: new GraphQLList(tableItem) }
    }
});

//Response Tables Items by pagination
const responseTableByPagination = new GraphQLObjectType({
    name: "tabelResponseByPagination",
    description: "all tables response by pagination",
    fields: {
        message: { type: GraphQLString },
        status: { type: GraphQLInt },
        totalCount: { type: GraphQLInt },
        data: { type: new GraphQLList(tableItem) }
    }
});

//Response One Table ById
const responseTableById = new GraphQLObjectType({
    name: "tabelResponseById",
    description: "table response BY ID",
    fields: {
        message: { type: GraphQLString },
        status: { type: GraphQLInt },
        data: { type: tableItem }
    }
});


export const query = {
    // all tables
    tableList: {
        type: responseTable,
        resolve: allTables
    },

    // all tables by pagination
    tableListByPagination: {
        type: responseTableByPagination,
        args: {
            page: { type: GraphQLInt },
            limit: { type: GraphQLInt }
        },
        resolve: allTablesByPagination
    },

    //one table by id
    tableById: {
        type: responseTableById,
        args: { id: { type: GraphQLID } },
        resolve: tableById
    },

    //generateQR
    generateQR: {
        type: qrcodeResponse,
        args: { tableNumber: { type: new GraphQLNonNull(GraphQLID) } },
        resolve: generateQR
    },

    //fixedQR
    fixedQR: {
        type: qrcodeResponse,
        resolve: fixedQR
    },
}