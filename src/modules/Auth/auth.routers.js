import { Router } from "express";
import { asyncHandler } from "../../utils/response/asyncHandler.js";
import { deleteUser, login, register, updateAdminToUser, updateUserToAdmin, updateUserToEmployee } from "./auth.controller.js";
import { validation } from "../../Middelware/validation.js";
import { loginValidation, registerValidation } from "./auth.validation.js";
import { auth } from "../../Middelware/authuntication.js";
import { endPoint } from "../../utils/autharization.js";


const authRouter = Router();

authRouter.post("/register" , validation(registerValidation), asyncHandler(register));
authRouter.post("/login" , validation(loginValidation) , asyncHandler(login));

authRouter.patch("/new-admin" , auth(endPoint.admin) , asyncHandler(updateUserToAdmin));
authRouter.patch("/add/new-employee" , auth(endPoint.admin) , asyncHandler(updateUserToEmployee));
authRouter.patch("/to-user" , auth(endPoint.admin) , asyncHandler(updateAdminToUser));

authRouter.delete("/:userId" ,  auth(endPoint.admin) , asyncHandler(deleteUser));


export default authRouter;