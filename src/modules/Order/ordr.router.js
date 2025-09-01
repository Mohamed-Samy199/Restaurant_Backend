import { Router } from "express";
import { auth } from "../../Middelware/authuntication.js";
import { endPoint } from "../../utils/autharization.js";
import { asyncHandler } from "../../utils/response/asyncHandler.js";
import { cancelOrder, createOrder, updateOrderStatusByAdmin } from "./order.controller.js";


const orderRouter = Router();

orderRouter.post("/" , auth(endPoint.user) , asyncHandler(createOrder));
orderRouter.post("/:tableNumber" , asyncHandler(createOrder));

orderRouter.patch("/" , auth(endPoint.user) , asyncHandler(cancelOrder));
orderRouter.patch("/:tableNumber" , asyncHandler(cancelOrder));


orderRouter.patch("/admin/:orderId" , auth(endPoint.user) , asyncHandler(updateOrderStatusByAdmin));


export default orderRouter;