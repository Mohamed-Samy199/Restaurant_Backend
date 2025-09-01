import { Router } from "express"
import { validation } from "../../Middelware/validation.js";
import { addCartValidtion } from "./cart.validation.js";
import { auth } from "../../Middelware/authuntication.js";
import { endPoint } from "../../utils/autharization.js";
import { asyncHandler } from "../../utils/response/asyncHandler.js";
import { clearCart, createOrUpdateCart, deleteItem, listOfCart, updataQuantityCart } from "./cart.controller.js";


const cartRouter = Router();

cartRouter.get("/" , auth(endPoint.user) , asyncHandler(listOfCart));
cartRouter.get("/:tableNumber" , asyncHandler(listOfCart));

cartRouter.post("/", auth(endPoint.user), asyncHandler(createOrUpdateCart));
cartRouter.post("/:tableNumber", asyncHandler(createOrUpdateCart));

cartRouter.patch("/remove/:menuId", auth(endPoint.user), asyncHandler(deleteItem));
cartRouter.patch("/remove/:menuId/:tableNumber", asyncHandler(deleteItem));

cartRouter.patch("/clear", auth(endPoint.user), asyncHandler(clearCart));
cartRouter.patch("/clear/table/:tableNumber", asyncHandler(clearCart));

cartRouter.patch("/", auth(endPoint.user), asyncHandler(updataQuantityCart));
cartRouter.patch("/:tableNumber", asyncHandler(updataQuantityCart));

export default cartRouter;