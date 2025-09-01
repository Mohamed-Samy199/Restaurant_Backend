import { GraphQLObjectType, GraphQLSchema } from "graphql";
import * as userGraphController from "./Auth/auth.graphRouter.js"
import * as categoryGraphController from "./Category/Graphql/categoryRouter.js";
import * as menuGraphController from "./Menu/Graphql/menuRouter.js";
import * as tableGraphController from "./Table/Graphql/tableRouter.js";
import * as cartGraphController from "./Cart/Graphql/cartRouter.js";
import * as orderGraphController from "./Order/Graphql/orderRouter.js";

export const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "getUsers",
        description: "show all users in my app",
        fields: {
            ...userGraphController.query,
            ...categoryGraphController.query,
            ...menuGraphController.query,
            ...tableGraphController.query,
            ...cartGraphController.query,
            ...orderGraphController.query
        }
    })
})