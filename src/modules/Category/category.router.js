import { Router } from "express";
import { validation } from "../../Middelware/validation.js";
import { endPoint } from "./category.endPoint.js";
import { auth } from "../../Middelware/authuntication.js";
import { categoryValidtion, deleteCategoryValidtion, updateCategoryValidtion } from "./category.validation.js";
import { asyncHandler } from "../../utils/response/asyncHandler.js";
import { addCategory, categories, deleteCategory, updateCategory } from "./category.controller.js";
import menuRouter from "../Menu/Menu.router.js";

const categoryRouter = Router();

categoryRouter.use("/menu" , menuRouter)

categoryRouter.get("/" , asyncHandler(categories))
categoryRouter.post("/" , validation(categoryValidtion) , auth(endPoint.admin) , asyncHandler(addCategory));
categoryRouter.put("/:categoryId" , validation(updateCategoryValidtion) , auth(endPoint.admin) , asyncHandler(updateCategory));
categoryRouter.delete("/:categoryId" , validation(deleteCategoryValidtion) , auth(endPoint.admin) , asyncHandler(deleteCategory));





export default categoryRouter;