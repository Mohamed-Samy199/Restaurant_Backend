import userModel from "../DB/Models/user.model.js";
import { asyncHandler } from "../utils/response/asyncHandler.js"
import { verifyToken } from "../utils/Securty/token.js";


export const roles = {
    User: "User",
    Admin: "Admin",
    Employee: "Employee"
}

export const auth = (accessRole = []) => {
    return asyncHandler(async (req, res, next) => {
        const { authorization } = req.headers;

        const [bearer, token] = authorization?.split(" ") || [];
        if (!bearer || !token) {
            return next(new Error("missing token", { cause: 400 }));
        }
        let signature = '';
        switch (signature) {
            case "System":
                signature = process.env.ADMIN_REFRESH_TOKEN_KEY;
                break;

            case "Employee":
                signature = process.env.EMPLOYEE_REFRESH_TOKEN_KEY;
                break;

            case "Bearer":
                signature = process.env.USER_REFRESH_TOKEN_KEY;
                break

            default:
                break;
        }
        const decode = verifyToken({ token });
        if (!decode?.id) {
            return next(new Error("In-valid token payload", { cause: 400 }));
        };
        const user = await userModel.findById(decode.id).select("userName role email")
        if (!user) {
            return next(new Error("user not register", { cause: 401 }));
        }
        if (!accessRole.includes(user.role)) {
            return next(new Error("Not authorized user", { cause: 403 }));
        }
        req.user = user;
        next();
    })
}