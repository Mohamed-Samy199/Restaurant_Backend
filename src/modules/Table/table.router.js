import { Router } from "express";
import { validation } from "../../Middelware/validation.js";
import { asyncHandler } from "../../utils/response/asyncHandler.js";
import { addTable, deleteTable, updateTable } from "./table.controller.js";
import { auth } from "../../Middelware/authuntication.js";
import { endPoint } from "../../utils/autharization.js";
import { addTableValidtion, tableValidtion } from "./table.validation.js";

const tableRouter = Router();

tableRouter.post("/" , validation(addTableValidtion) ,auth(endPoint.admin) , asyncHandler(addTable))
tableRouter.patch("/:tableId" , validation(tableValidtion) ,auth(endPoint.admin) , asyncHandler(updateTable))
tableRouter.delete("/:tableId" , validation(tableValidtion) ,auth(endPoint.admin) , asyncHandler(deleteTable))


// tableRouter.get("/:tableNumber" , asyncHandler(generateQR));
// tableRouter.get("/menu/table", verifyTableAccess, getMenuForTable); //don't use it because thier anther it in graphql

export default tableRouter;