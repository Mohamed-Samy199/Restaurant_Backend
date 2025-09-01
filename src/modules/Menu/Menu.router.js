import { Router } from "express";
import { validation } from "../../Middelware/validation.js";
import { menuValidtion } from "./Menu.validation.js";
import { auth } from "../../Middelware/authuntication.js";
import { endPoint } from "../../utils/autharization.js";
import { asyncHandler } from "../../utils/response/asyncHandler.js";
import { addMenu, deleteMenu, qrcodeMenu, updateMenu } from "./Menu.controller.js";
import { myMulter } from "../../utils/imageReload/multer.js";

const menuRouter = Router({ mergeParams: true });

menuRouter.get("/qrcode", asyncHandler(qrcodeMenu));
menuRouter.post("/:categoryId" ,  auth(endPoint.admin) , myMulter({}).single("image") , asyncHandler(addMenu));
menuRouter.patch("/:categoryId/:menuId" ,  auth(endPoint.admin) , myMulter({}).single("image") , asyncHandler(updateMenu));
menuRouter.delete("/:categoryId/:menuId" ,  auth(endPoint.admin) , asyncHandler(deleteMenu));


export default menuRouter;