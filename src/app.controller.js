import { createHandler } from "graphql-http/lib/use/express";
import DBConnect from "./DB/connect.js";
import authRouter from "./modules/Auth/auth.routers.js";
import { globalError } from "./utils/response/asyncHandler.js";
import { schema } from "./modules/app.graphql.js";
import categoryRouter from "./modules/Category/category.router.js";
import tableRouter from "./modules/Table/table.router.js";
import cartRouter from "./modules/Cart/cart.router.js";
import orderRouter from "./modules/Order/ordr.router.js";
//import paymentRouter from "./modules/payment.js"
import cors from "cors";
//import { createPayment } from "./modules/payment.js";

const bootstrap = (app, express) => {
    app.use(express.json());
    app.get("/", (req, res) => res.send("APP")); 
    app.use(cors()); 



    app.use("/graphql", createHandler({ schema }));
    app.use("/auth", authRouter);
    app.use("/category", categoryRouter);
    app.use("/table", tableRouter);
    app.use("/cart", cartRouter);
    app.use("/order", orderRouter);
    //app.use('/api', createPayment); 

    app.all("*", (req, res) => {
        return res.status(404).json({ message: `In-valid router - can not access this endPoint ${req.originalUrl}` })
    });

    app.use(globalError);
    DBConnect();
} 

export default bootstrap;